import sys
from sklearn import tree
from sklearn.ensemble import AdaBoostClassifier
import pickle
from sklearn import tree
import numpy as np
# Order needed for model:
# Age,Gender,pee,thirsty,weightloss,weak,hungry,yeast,blurring,itching,irritable,healing,paralysis,stiffness,alopecia,obesity
print("Age "+sys.argv[1])
print("Gender "+sys.argv[2])
print("Pee "+sys.argv[3])
print("Thirsty "+sys.argv[4])
print("Weightloss "+sys.argv[5])
print("Weak "+sys.argv[6])
print("hungry "+sys.argv[7])
print("yeast "+sys.argv[8])
print("blurring "+sys.argv[9])
print("itching "+sys.argv[10])
print("irritable "+sys.argv[11])
print("healing " + sys.argv[12])
print("paralysis "+sys.argv[13])
print("stiffness "+sys.argv[14])
print("Alopecia "+sys.argv[15])
print("Obesity "+sys.argv[16])


age = int(sys.argv[1])
gender = int(sys.argv[2])
pee = int(sys.argv[3])
thirsty = int(sys.argv[4])
weightloss = int(sys.argv[5])
weak = int(sys.argv[6])
hungry = int(sys.argv[7])
yeast = int(sys.argv[8])
blurring = int(sys.argv[9])
itching = int(sys.argv[10])
irritable = int(sys.argv[11])
healing = int(sys.argv[12])
paralysis = int(sys.argv[13])
stiffness = int(sys.argv[14])
alopecia = int(sys.argv[15])
obese = int(sys.argv[16])

X = [[age, gender, pee, thirsty, weightloss, weak, hungry, yeast, blurring,
      itching, irritable, healing, paralysis, stiffness, alopecia, obese]]

print(X)

# TRYING TO PICKLE
pickle_path = 'ml_model/ada_pickle_model.pkl'
print("made it here 1 ")
with open(pickle_path, 'rb') as file:
    clf = pickle.load(file)
print("made it here")
pred_prob = clf.predict_proba(X)
pred_label = clf.predict(X)
print(pred_prob)
print(pred_label)

print('{ "pred":"'+str(pred_label[0]) +
      '", "pred_prob":"'+str(pred_prob[0])+'"}')

sys.stdout.flush()
