from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from utils.error_helper import validation_message


# Register the handlers that catch errors and return a clean JSON response.
def register_exception_handlers(server: FastAPI) -> None:

    # Catch HTTP exceptions (for example a 404 raised by a service):
    @server.exception_handler(HTTPException)
    def catch_http_errors(request: Request, err: HTTPException):
        print("Error: " + str(err))
        return JSONResponse(status_code = err.status_code, content = { "message": err.detail })

    # Catch validation exceptions (a bad request body):
    @server.exception_handler(RequestValidationError)
    def catch_validation_errors(request: Request, err: RequestValidationError):
        print("Error: " + str(err))
        message = validation_message(err)
        return JSONResponse(status_code = 400, content = { "message": message })

    # Catch everything else (an unexpected server error):
    @server.exception_handler(Exception)
    def catch_all(request: Request, err: Exception):
        print("Error: " + str(err))
        return JSONResponse(status_code = 500, content = { "message": str(err) })
