exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Function called with method:', event.httpMethod);
    console.log('Request body:', event.body);

    const { event_name, event_id, custom_data, user_data } = JSON.parse(event.body);
    console.log('Parsed event data:', { event_name, event_id });

    // Your Meta Pixel ID and Access Token
    // IMPORTANT: Replace these with your actual values
    const PIXEL_ID = '1099694521779646';
    const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

    console.log('Access token present:', !!ACCESS_TOKEN);

    if (!ACCESS_TOKEN) {
      console.error('META_CONVERSIONS_API_ACCESS_TOKEN environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Prepare the Conversions API payload
    const payload = {
      data: [{
        event_name: event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id,
        custom_data: custom_data || {},
        user_data: user_data || {},
        action_source: 'website'
      }],
      access_token: ACCESS_TOKEN
    };

    // Add test_event_code for testing in development
    if (process.env.NODE_ENV === 'development') {
      payload.test_event_code = 'TEST12345';
    }

    console.log('Sending payload to Meta API:', JSON.stringify(payload, null, 2));

    // Send to Meta Conversions API
    const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Meta API response status:', response.status);
    const result = await response.json();
    console.log('Meta API response:', result);

    if (!response.ok) {
      console.error('Meta Conversions API error:', result);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Failed to send event to Meta',
          details: result
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        event_id: event_id,
        result: result
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
