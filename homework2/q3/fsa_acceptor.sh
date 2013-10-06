#!/bin/sh
cat $2 | while read line; do
	textfile_listing2=$(carmel $line | carmel -k -sli $1)
	echo $textfile_listing2
done