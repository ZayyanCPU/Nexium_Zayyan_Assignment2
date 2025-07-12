import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('fulltext')
    const collection = db.collection('fulltext')
    
    const documents = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray()
    
    return NextResponse.json(documents)
  } catch (error) {
    console.error('MongoDB dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch MongoDB data' },
      { status: 500 }
    )
  }
} 