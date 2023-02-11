const axios = require('axios')
const { NOTION_API_KEY } = process.env
const NOTION_DATABASE_ID = '32d43c95310245e6a074a6e5b353581d'

exports.handler = async function(event, context) {
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json'
    },
    data: {page_size: 200, sorts: [
        {
            "property": "title",
            "direction": "ascending"
        }
    ]}
  }

  try {
    const res = await axios.request(options)

    return {
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}