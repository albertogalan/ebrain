#!/usr/bin/env python
import argparse
from os import path
import sys
import os
reload(sys)
sys.setdefaultencoding('utf-8')
import json


parser = argparse.ArgumentParser()
parser.add_argument('--file', help='file image to process')
parser.add_argument('--output', help='output file to write the results')
args = parser.parse_args()


VARIABLE="DD"

class imageinfo:
	"""A translate google class"""
	def __init__(self, file, output):
		self.file = file
		self.outputfile =  path.join(path.dirname(path.realpath(__file__)), output)

	def process(self):

		print('processing')
		return 'data extracted'
	def appenddata(self,json):
# https://docs.python.org/3.6/tutorial/inputoutput.html#saving-structured-data-with-json
		img=readfile(self.file)


		writefile(self.file,json)




def main(obj):

	print(obj.file +' - '+obj.output)
	x=imageinfo('data/image.jgp','data/images.json')
	x.process()


main(args) 
