regex='^Empty or invalid result of composition with transducer$'
if [[ $1 =~ $regex ]]; then
	echo 'success!'
else
	echo 'failure!'
fi