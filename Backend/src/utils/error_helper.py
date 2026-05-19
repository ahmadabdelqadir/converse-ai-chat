from fastapi.exceptions import RequestValidationError


# Turns a Pydantic validation error into one short, readable message.
def validation_message(err: RequestValidationError) -> str:
    try:
        prop_name = err.errors()[0]["loc"][1]
        error = err.errors()[0]["msg"]
        message = f"Invalid '{prop_name}': {error}"
        return message
    except:
        return str(err)
