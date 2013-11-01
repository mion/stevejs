import json
from collections import defaultdict

RAW_DATA_PATH = "data/js-mdn.json"


class SearchEngine(object):
	"""A very simple documentation search engine."""
	def __init__(self):
		self.db = defaultdict(lambda: [])

	def load(self):
		docs = json.load(open(RAW_DATA_PATH))
		for doc in docs:
			self.db[doc['title']] = doc

	def search(self, query):
		return self.db[query]
