#!/opt/python-2.7/bin/python2.7

#Created on 12 Oct, 2013
#authors: Michael Roylance, Olga Whelan


import sys
import re
import os


def main():

  fn1 = sys.argv[1]   # fn1 - output file with best scoring paths 
  f1 = open(fn1, 'ru')
  lines = f1.readlines()
#  print lines
#  print len(lines)

  fn2 = sys.argv[2]   # fn2 - stderr; prints out unsplit input string, the number of states/arcs and/or the error message
  f2 = open(fn2, 'ru')
  i = 0
  l2 = f2.readline()
  while l2:
    match = re.search(':\s*(\".+\")$', l2)   # get the name of the string from fn2
    l2 = f2.readline()
    l2 = f2.readline()
    if l2[0:5] == 'Input':
      input = match.group(1)
    else:
      input = match.group(1)
      l2 = f2.readline() 
    
    if i < len(lines):
      match_output = re.findall(':\s*(\"\w*\"|\*e\*)\s*\/', lines[i])   # use regex to extract the output sequence
      match_prob = re.search('\d(\.\d+)?$', lines[i])   # catch the probability in the end of line
      if lines[i][0] == '(':   # address the 0-string case in fn1
        output = ' '.join(match_output)
        prob = match_prob.group()
      else:
        output = '*none*'
        prob = 0

      print input, '=>', output, prob   # output format
   
    i += 1   # incrementing the counter for lines in fn1

  f2.close()

  f1.close()


  
if __name__ == '__main__':
  main()
