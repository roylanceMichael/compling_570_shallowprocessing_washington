#!/bin/sh
regex='^Empty or invalid result of composition with transducer$'

cat $2 | while read line; do
	textfile_listing2=$(echo $line | carmel -sli $1)

	if [[ textfile_listing2 =~ $regex]]; then
		echo 'success'
	else
		echo 'failure'
	fi
done