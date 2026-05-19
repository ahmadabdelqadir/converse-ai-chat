from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


# Prints the method and route of every incoming request to the console.
class LoggerMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next: Callable) -> Response:

        # Log method and route:
        print("Method: " + request.method)
        print("Route: " + request.url.path)

        # Continue to the next middleware / route:
        response = await call_next(request)

        return response
