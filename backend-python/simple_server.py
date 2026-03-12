"""Simple HTTP server without dependencies"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                "message": "Local Business Finder API - Simple Server",
                "status": "running",
                "note": "Install FastAPI for full features: pip install fastapi uvicorn pymongo"
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def log_message(self, format, *args):
        print(f"[Server] {format % args}")

if __name__ == '__main__':
    port = 5000
    server = HTTPServer(('localhost', port), SimpleHandler)
    print(f"Simple server running on http://localhost:{port}")
    print("Press Ctrl+C to stop")
    server.serve_forever()
