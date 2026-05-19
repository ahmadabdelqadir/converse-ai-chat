from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
from controllers.chat_controller import router
from middleware.error_handler import register_exception_handlers
from middleware.logger_middleware import LoggerMiddleware

# Create the REST API server:
server = FastAPI(title = "AI Chat API")

# Allow the React client (a different origin) to call this API:
server.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173", "http://localhost:3000"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# Register the logger middleware:
server.add_middleware(LoggerMiddleware)

# Register the exception handlers:
register_exception_handlers(server)

# Register the routes:
server.include_router(router)

# Run this line only if app.py is started directly from the terminal:
if __name__ == "__main__":
    run("app:server", port = 4000, reload = True)
