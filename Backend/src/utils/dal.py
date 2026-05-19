from sqlalchemy import create_engine
from utils.app_config import AppConfig
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Base class that every database model inherits from.
BaseModel = declarative_base()


# DAL = Data Access Layer. Creates the session used to talk to MySQL.
class Dal:

    # A session object performs the actions on the database.
    def create_session(self):

        # The engine handles the connection to MySQL:
        engine = create_engine(AppConfig.connection_string)

        # Create the tables if they do not exist yet:
        BaseModel.metadata.create_all(engine)

        # A session factory is a function that builds session objects:
        session_factory = sessionmaker(bind = engine)

        # Create the session which can CRUD the database:
        session = session_factory()

        return session
