set term png
set output "photo-graph.png"
set xlabel "Number of Photos"
set ylabel "Portion of Group Uploading That Many Photos"
plot "out" using 1:2 with lines title "Group 1", "out" using 1:3 with lines title "Group 2", "out" using 1:4 with lines title "Group 3", "out" using 1:5 with lines title "Group 4"
