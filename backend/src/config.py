import os

class Config(object):
    SECRET_KEY = 'sbnmjfdlolejax'
   

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.abspath(os.getcwd()) + "/database/database.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MetaJSON_SORT_KEYS=Falsejsonifyordered=True