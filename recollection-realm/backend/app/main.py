from fastapi import FastAPI
from app.routers import #(files from routers)

app = FastAPI()

app.include_router() #<--- files from routers ...

#more stuff