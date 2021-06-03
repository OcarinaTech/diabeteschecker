import sys

print("<p>OMG, data from python: "); 
print(sys.argv)
print(int(sys.argv[1])*123)
print(int(sys.argv[2])*123)
print(int(sys.argv[3])*123)
print("</p>")
sys.stdout.flush()
