import os

from flask import Flask, request, jsonify
from flasgger import Swagger
from dotenv import load_dotenv

from db.Connection import Connection
from services.user import update_user_service

load_dotenv()
PORT = os.getenv('SERVICE_PORT', 5000)

db_connection = Connection(
    DB_HOST=os.getenv('DB_HOST'),
    DB_NAME=os.getenv('DB_NAME')
)
db_connection.get_connection()

app = Flask(__name__)

app.config['SWAGGER'] = {
    'uiversion': 3,
    'openapi': '3.0.2',
    'swagger_ui': True,
    'specs_route': '/api-docs',
    'info': {
        'title': 'User Update Service API',
        'description': 'API documentation for User Update Service',
        'version': '1.0.0'
    },
    'servers': [
        {
            'url': f'http://localhost:{PORT}'
        }
    ]
    
}
swagger = Swagger(app)


@app.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint
    ---
    responses:
      200:
        description: Service is healthy
        schema:
          type: object
          properties:
            message:
              type: string
              example: OK!
    """
    return jsonify(message="OK!"), 200

@app.route('/update_user', methods=['PUT'])
def update_user():
    """
    Update a user
    ---
    requestBody:
      description: User object that needs to be updated. The `_id` field is required to find the user.
      required: true
      content:
        application/json:
          schema:
            type: object
            required:
              - _id
            properties:
              _id:
                type: string
                example: "us_1678886400000"
              name:
                type: string
                example: "Jane Doe"
              email:
                type: string
                example: "jane.doe@example.com"
              assignedTaskIds:
                type: array
                items:
                  type: string
                example: ["task_id3"]
    responses:
      200:
        description: User updated successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: boolean
                  example: true
    """
    user_data = request.get_json()
    if not user_data or not user_data.get('_id'):
        return jsonify(status=False, message="Request body is missing or _id is not provided."), 400
    
    if update_user_service(user_data):
        return jsonify(status=True), 200
    else:
        return jsonify(status=False, message="Failed to update user."), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)