import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { ALLOWED_WEBSITES, PREDEFINED_SUMMARIES, URDU_TRANSLATIONS } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import clientPromise from '@/lib/mongodb'

const requestCounts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(userAgent: string): boolean {
  const now = Date.now()
  const windowMs = 60000
  const maxRequests = 5

  const userRequests = requestCounts.get(userAgent)
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(userAgent, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userRequests.count >= maxRequests) {
    return false
  }

  userRequests.count++
  return true
}

function extractDetailedContent($: cheerio.CheerioAPI) {
  let content: string[] = [];
  const roots = $('main, .main, .content, .post, .article, .entry, body').toArray();
  roots.forEach((el) => {
    $(el).children().each((_, child) => {
      const tag = child.tagName?.toLowerCase();
      if (!tag) return;
      if (["h1","h2","h3","h4","h5","h6"].includes(tag)) {
        content.push('\n' + $(child).text().trim().toUpperCase() + '\n');
      } else if (tag === 'p') {
        content.push($(child).text().trim() + '\n');
      } else if (tag === 'ul' || tag === 'ol') {
        $(child).find('li').each((_, li) => {
          content.push('- ' + $(li).text().trim());
        });
        content.push('\n');
      } else if (tag === 'blockquote') {
        content.push('"' + $(child).text().trim() + '"\n');
      } else if (tag === 'pre' || tag === 'code') {
        content.push('\n' + $(child).text().trim() + '\n');
      } else if (tag === 'img') {
        const alt = $(child).attr('alt');
        if (alt) content.push(`[Image: ${alt}]\n`);
      }
    });
  });
  return content.join('\n').replace(/\n{2,}/g, '\n\n').trim();
}

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || 'unknown'
    if (!checkRateLimit(userAgent)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const { url } = await request.json()

    if (!ALLOWED_WEBSITES.includes(url)) {
      return NextResponse.json(
        { 
          error: 'This feature is only available for the following websites:',
          allowedWebsites: ALLOWED_WEBSITES
        },
        { status: 400 }
      )
    }

    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    
    $('script, style, nav, footer, header, .nav, .footer, .header, .sidebar, .advertisement, .ads, [class*="ad-"], [id*="ad-"]').remove()
    
    let fullText = extractDetailedContent($)
    
    if (!fullText || fullText.length < 100) {
      fullText = $('body').text().replace(/\s{2,}/g, '\n').trim();
    }
    
    const summary = PREDEFINED_SUMMARIES[url]
    const urduTranslation = URDU_TRANSLATIONS[url]

    const client = await clientPromise
    const db = client.db('fulltext')
    const fullTextCollection = db.collection('fulltext')
    
    const mongoDocument = {
      url,
      fullText,
      textLength: fullText.length,
      timestamp: new Date(),
      userAgent: userAgent,
      extractedAt: new Date().toISOString()
    }
    
    const mongoResult = await fullTextCollection.insertOne(mongoDocument)
    console.log(`✅ Full text stored in MongoDB with ID: ${mongoResult.insertedId}`)
    console.log(`📊 Text length: ${fullText.length} characters`)

    try {
      const { error: supabaseError } = await supabase
        .from('Summary')
        .insert([
          {
            url,
            summary,
            time: new Date().toISOString()
          }
        ])

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        throw supabaseError
      }
    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError)
      throw supabaseError
    }

    return NextResponse.json({
      success: true,
      summary,
      urduTranslation,
      fullText: fullText,
      textLength: fullText.length,
      mongoId: mongoResult.insertedId
    })

  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json(
      { error: 'Failed to scrape website. Please try again.' },
      { status: 500 }
    )
  }
} 