echo '"a" "b"' | carmel -sli fsa4
echo '"a" "a" "a" "b"' | carmel -sli fsa4 
echo '"a" "b" "b" "b"' | carmel -sli fsa4
echo 'these should fail:'
echo '""' | carmel -sli fsa4
echo '"a" "a" "a"' | carmel -sli fsa4 # should be invalid
echo '"a"' | carmel -sli fsa4 # should be invalid
echo '"b"' | carmel -sli fsa4 # should be invalid
echo '"a" "b" "a"' | carmel -sli fsa4 #should be invalid