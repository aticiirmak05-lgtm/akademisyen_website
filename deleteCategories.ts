import { getCliClient } from 'sanity/cli'

async function deleteAll() {
  const client = getCliClient({
    projectId: 'm9zwe19w',
    dataset: 'production'
  })
  
  // Find all artworks and categories including drafts
  const query = `*[_type in ["category", "artwork"]]._id`
  const docs = await client.fetch(query)
  
  if (docs.length === 0) {
    console.log('No documents found.')
    return
  }
  
  console.log(`Found ${docs.length} documents. Unsetting references...`)
  
  // Unset all references first
  for (const id of docs) {
    try {
      await client.patch(id).unset(['category', 'altKoleksiyonlar']).commit()
    } catch (e) {
      // ignore
    }
  }

  // Delete all
  let remaining = docs;
  let maxLoops = 5;
  while(remaining.length > 0 && maxLoops > 0) {
    console.log(`Attempting to delete ${remaining.length} items...`)
    const failed = []
    for (const id of remaining) {
      try {
        await client.delete(id)
        console.log(`Deleted: ${id}`)
      } catch (e) {
        failed.push(id)
      }
    }
    remaining = failed
    maxLoops--
  }
  
  if (remaining.length > 0) {
    console.error(`Failed to delete ${remaining.length} items:`, remaining)
  } else {
    console.log('All categories and artworks have been deleted successfully.')
  }
}

deleteAll().catch(console.error)
