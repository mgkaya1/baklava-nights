exports.handler = async (event, context) => {
  console.log('=== DEBUG FUNCTION CALLED ===');
  console.log('Method:', event.httpMethod);
  console.log('Headers:', event.headers);
  console.log('Body:', event.body);

  try {
    const parsed = JSON.parse(event.body);
    console.log('Parsed body:', parsed);

    const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;
    console.log('Access token exists:', !!accessToken);
    console.log('Access token length:', accessToken ? accessToken.length : 0);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        received: parsed,
        accessTokenExists: !!accessToken,
        accessTokenLength: accessToken ? accessToken.length : 0,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Debug function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
