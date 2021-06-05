from sklearn.neighbors import KNeighborsClassifier
from sklearn import tree
from sklearn import metrics
from sklearn.model_selection import train_test_split
from sklearn.ensemble import AdaBoostClassifier

from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
import pandas as pd
import pickle

import numpy as np
from itertools import cycle

import numpy as np
import timeit, functools
import warnings 
import methods as methods

from sklearn.preprocessing import MinMaxScaler
warnings.filterwarnings("ignore")
import random
import sys



def compare(dataSet, setName):
    random.seed(5)
    np.random.seed(5)

    X = dataSet.iloc[:,:-1].values 
    y = dataSet.iloc[:,-1].values
    scaler = MinMaxScaler()  # Default behavior is to scale to [0,1]
    X = scaler.fit_transform(X)
    # Evaluating performance using train /test split
    X_train, X_test, y_train, y_test = train_test_split(X,y, test_size= 0.4, random_state = 4)

    print("\nGridsearch finding best models for "+setName)
    
    # BOOST GRID SEARCH
    dt_est = tree.DecisionTreeClassifier()
    ada = AdaBoostClassifier(base_estimator=dt_est, n_estimators=200)
    depth_range = [1,10,20,30,40,50,60,70,80,90,100]
    alpha_range = np.arange(0, 0.5, .01).tolist()
    n_estimators_range= [10,50]
    param_grid4 = {"base_estimator__max_depth":depth_range,"base_estimator__ccp_alpha":alpha_range,
              "n_estimators": n_estimators_range
             }
    grid4 = GridSearchCV(ada, param_grid4, cv=10, scoring='accuracy', return_train_score=False, n_jobs=-1)
    grid4.fit(X_train, y_train)
    pd.DataFrame(grid4.cv_results_)[['mean_test_score', 'std_test_score', 'params']]
    # examine the best model
    print("\nThe Best ADA Boost model for "+setName)
    print(grid4.best_score_)
    print(grid4.best_params_ )
    print("Mean Test Score "+str(grid4.cv_results_['mean_test_score'][grid4.best_index_]))
    print("STD Dev Test Score "+str(grid4.cv_results_['std_test_score'][grid4.best_index_]))

    ada_grid_pred = grid4.best_estimator_.predict(X_test)
    print("Confusion for ADA Grid Prediction")
    methods.getConfusion(y_test,ada_grid_pred)

    ada = grid4.best_estimator_
    print("\nTime to Train Optimal ada: ")  
    t = (timeit.Timer(functools.partial(ada.fit,X_train,y_train)))
    print(t.timeit(1))
    print("Time to Query Optimal ada: ")  
    t = (timeit.Timer(functools.partial(ada.predict,X_test)))
    print(t.timeit(1))
    print("\n")
    pkl_filename = "ada_pickle_model.pkl"
    with open(pkl_filename, 'wb') as file:
        pickle.dump(ada, file)




def runExperiment():
    f = open("grid_search_results.txt", 'w')
    sys.stdout = f
    diabetes_dataSet = pd.read_csv("../data/diabetes_data_upload.csv")
    compare(diabetes_dataSet,"Early Stage Diabetes Risk Prevention")
    f.close()


   
if __name__ == '__main__':
    # https://archive.ics.uci.edu/ml/datasets/Early+stage+diabetes+risk+prediction+dataset.
    #  Early stage diabetes risk prediction dataset. This dataset contains the sign and symptpom data of newly diabetic or would be diabetic patient.	
    # male set to 1, female set to 0, positive set to 1, negative set to 0, yes set to 1, no set to 0
    runExperiment()

   
