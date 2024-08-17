import json
import boto3
import re
import uuid
import time

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Customer-enquiry-db')

def validate_email(email):
    # Simple regex for email validation
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(email_regex, email) is not None

def lambda_handler(event, context):
    # Parse the input data
    body = json.loads(event.get('body', '{}'))
    
    name = body.get('name')
    email = body.get('email')
    category = body.get('category')
    message = body.get('message')

    # Basic validations
    if not name or len(name) < 3:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid name. Name should be at least 3 characters long.'})
        }

    if not email or not validate_email(email):
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid email address.'})
        }

    if not category or category not in ['General', 'Support', 'Sales']:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid category. Allowed categories are: General, Support, Sales.'})
        }

    if not message or len(message) < 10:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid message. Message should be at least 10 characters long.'})
        }

    # Save to DynamoDB
    try:
        table.put_item(
            Item={
                'username': email,  # Assuming 'username' is the primary key
                'name': name,
                'email': email,
                'category': category,
                'message': message,
                'timestamp': int(time.time())  # Current timestamp
            }
        )
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Could not save the data to DynamoDB. Error: {str(e)}'})
        }

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Enquiry submitted successfully!'})
    }
