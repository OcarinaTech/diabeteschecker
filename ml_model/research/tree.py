from sklearn.neighbors import KNeighborsClassifier
from sklearn import tree
from sklearn import metrics
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import roc_curve, roc_auc_score
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import auc
# import methods as methods
import numpy as np
import matplotlib.pyplot as plt
from itertools import cycle
import random
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import timeit
import functools
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score


def testTree(dataSet, setName):
    random.seed(5)
    np.random.seed(5)

    X = dataSet.iloc[:, :-1].values  # data
    y = dataSet.iloc[:, -1].values  # label
    scaler = MinMaxScaler()  # Default behavior is to scale to [0,1]
    X = scaler.fit_transform(X)

    '''

    Adapted from tutorial: 
    https://towardsdatascience.com/machine-learning-part-17-boosting-algorithms-adaboost-in-python-d00faac6c464
        
    '''

    # Evaluating performance using train /test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.4, random_state=4)

    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(X_train, y_train)  # training
    pred_y_test = clf.predict(X_test)  # take this model and use predict
    print(pred_y_test)

    pred_y_train = clf.predict(X_train)
    print(pred_y_train)

    print(accuracy_score(pred_y_test, y_test))
    print(accuracy_score(pred_y_train, y_train))

    # Neighbor
    neigh = KNeighborsClassifier(n_neighbors=3)
    clf = neigh.fit(X_train, y_train)
    pred_y_test = clf.predict(X_test)  # take this model and use predict
    print(pred_y_test)

    pred_y_train = clf.predict(X_train)
    print(pred_y_train)

    print(accuracy_score(pred_y_test, y_test))
    print(accuracy_score(pred_y_train, y_train))


def runExperiment():
    diabetes_dataSet = pd.read_csv("../data/diabetes_data_upload.csv")
    testTree(diabetes_dataSet, "Early Stage Diabetes Risk Prevention")


if __name__ == '__main__':
    # https://archive.ics.uci.edu/ml/datasets/Early+stage+diabetes+risk+prediction+dataset.
    #  Early stage diabetes risk prediction dataset. This dataset contains the sign and symptpom data of newly diabetic or would be diabetic patient.
    # male set to 1, female set to 0, positive set to 1, negative set to 0, yes set to 1, no set to 0
    diabetes_dataSet = pd.read_csv("../data/diabetes_data_upload.csv")
    testTree(diabetes_dataSet, "Early Stage Diabetes Risk Prevention")
