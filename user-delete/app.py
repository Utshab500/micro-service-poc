import os

from flask import Flask, request, jsonify
from flasgger import Swagger
from dotenv import load_dotenv

from db.Connection import Connection
from services.user import delete_user_service

load_dotenv()
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
    'specs_route': '/api-docs/'
}
swagger = Swagger(app)


@app.route('/health', methods=['GET'])
def hello_world():
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

@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    """
    Delete a user by ID
    ---
    parameters:
      - name: user_id
        in: query
        type: string
        required: true
        description: The ID of the user to delete
    responses:
      200:
        description: User deleted successfully
        schema:
          type: object
          properties:
            message:
              type: string
              example: User deleted
    """
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify(message="user_id query parameter is required"), 400
    if not delete_user_service(user_id):
        return jsonify(message=f"Failed to delete user {user_id}"), 500
    return jsonify(message=f"User {user_id} deleted"), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
