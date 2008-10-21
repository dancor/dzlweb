# normalize four sample groups

rows = [[float(v) for v in l.split('\t')] for l in file('putdata').readlines()]

group_n = 4
sum_i = [0 for i in range(group_n)]

for row in rows:
    for i in range(group_n):
        sum_i[i] += row[i + 1]
for row in rows:
    vs = [row[0]] + [row[i + 1] / sum_i[i] for i in range(group_n)]
    print '\t'.join(str(v) for v in vs)
