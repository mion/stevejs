# -*- coding: utf-8 -*-
import json
from search_engine import SearchEngine
from flask import Flask, request


app = Flask(__name__)
engine = SearchEngine()

@app.route("/search")
def search():
    query = request.args.get('query')
    result = engine.search(query)
    return json.dumps(result)


if __name__ == "__main__":
    print ' * Loading data into search engine...'
    engine.load()
    print ' * Success: {} records loaded'.format(len(engine.db))
    app.run()
