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
import methods as methods
import numpy as np
import matplotlib.pyplot as plt
from itertools import cycle
import random
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import timeit, functools
from sklearn.preprocessing import MinMaxScaler

def testAda(dataSet, setName):
    random.seed(5)
    np.random.seed(5)

    X = dataSet.iloc[:,:-1].values 
    y = dataSet.iloc[:,-1].values
    scaler = MinMaxScaler()  # Default behavior is to scale to [0,1]
    X = scaler.fit_transform(X)
    '''

    Adapted from tutorial: 
    https://towardsdatascience.com/machine-learning-part-17-boosting-algorithms-adaboost-in-python-d00faac6c464
        
    '''

    
    # Evaluating performance using train /test split
    X_train, X_test, y_train, y_test = train_test_split(X,y, test_size= 0.4, random_state = 4)



    # ADA BOOST CLASSIFIER
    '''
    ada = AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=200)
    # fit the model with data
    ada.fit(X_train,y_train)
    ada_pred = ada.predict(X_test)
    '''
    # STEP 3 EVALUATE PERFORMANCE
    #print("The ADA Boost model scored:")
    #print (metrics.accuracy_score(y_test, ada_pred))

    # Calculate Cross-Validated AUC
    #print("The ADA Boost model scored CV AUC:")
    #print(cross_val_score(ada, X, y, cv=10, scoring='roc_auc').mean())


    # STEP 4 EVALUATE TIME TO TRAIN AND PREDICT
    # Returns time in seconds for one execution see https://docs.python.org/3/library/timeit.html
    # See https://stackoverflow.com/questions/5086430/how-to-pass-parameters-of-a-function-when-using-timeit-timer
    #print("\nThe ADA model takes this long to fit the data:")
    #t = timeit.Timer(functools.partial(ada.fit,X_train,y_train))
    #print(t.timeit(1))
    #print("The ADA model takes this long to predict the data:")
    #t = timeit.Timer(functools.partial(ada.predict,X_test))
    #print(t.timeit(1))


    print("Analyzing ADA Boost Model for "+setName)
    # Plotting Values of ADA classifier to see how alpha range impacts accuracy
    alpha_range = np.arange(0, 0.5, .01).tolist()
    testscores_10 = []
    trainscores_10 = []
    testscores_50 = []
    trainscores_50 = []
    for a in alpha_range: 
        a = a * 0.01
        ada = AdaBoostClassifier(tree.DecisionTreeClassifier(ccp_alpha=a), n_estimators=10)
        # fit the model with data
        ada.fit(X_train,y_train)
        y_pred_test_10 = ada.predict(X_test)
        y_pred_train_10 = ada.predict(X_train)
        testscores_10.append(metrics.accuracy_score(y_test, y_pred_test_10))
        trainscores_10.append(metrics.accuracy_score(y_train, y_pred_train_10))

        ada = AdaBoostClassifier(tree.DecisionTreeClassifier(ccp_alpha=a), n_estimators=50)
        # fit the model with data
        ada.fit(X_train,y_train)
        y_pred_test_50 = ada.predict(X_test)
        y_pred_train_50 = ada.predict(X_train)
        testscores_50.append(metrics.accuracy_score(y_test, y_pred_test_50))
        trainscores_50.append(metrics.accuracy_score(y_train, y_pred_train_50))

    plt.plot(alpha_range, testscores_10, label="testing 10 trees")
    plt.plot(alpha_range, trainscores_10,label="training 10 trees")
    plt.plot(alpha_range, testscores_50, label="testing 50 trees")
    plt.plot(alpha_range, trainscores_50,label="training 50 trees")
    plt.legend()
    plt.xlabel('CCP Alpha Value')
    plt.ylabel('Testing accuracy')
    plt.title('ADA Accuracy with different alpha value (pruning)\n For 10 and 50 Trees \n'+setName)
    plt.savefig('./images/ada_pruning_analysis_'+setName+'.png')
    #plt.show()
    plt.clf()

    # Plotting Values of ADA classifier to see how Depth impacts accuracy
    testscores_10 = []
    trainscores_10 = []
    testscores_50 = []
    trainscores_50 = []
    cv_10 = []
    cv_50 = []
    depth_range = range(1, 100)
    scores = []
    for a in depth_range:         
        ada = AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=a), n_estimators=10)
        # fit the model with data
        ada.fit(X_train,y_train)
        y_pred_test_10 = ada.predict(X_test)
        y_pred_train_10 = ada.predict(X_train)
        testscores_10.append(metrics.accuracy_score(y_test, y_pred_test_10))
        trainscores_10.append(metrics.accuracy_score(y_train, y_pred_train_10))
        cvscore10 = cross_val_score(ada, X_train, y_train, cv=10,n_jobs=-1)
        cv_10.append(cvscore10.mean())

        ada = AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=a), n_estimators=50)
        # fit the model with data
        ada.fit(X_train,y_train)
        y_pred_test_50 = ada.predict(X_test)
        y_pred_train_50 = ada.predict(X_train)
        testscores_50.append(metrics.accuracy_score(y_test, y_pred_test_50))
        trainscores_50.append(metrics.accuracy_score(y_train, y_pred_train_50))
        cvscore50 = cross_val_score(ada, X_train, y_train, cv=10,n_jobs=-1)
        cv_50.append(cvscore50.mean())



    plt.plot(depth_range, testscores_10, label="testing 10 trees")
    plt.plot(depth_range, trainscores_10,label="training 10 trees")
    plt.plot(depth_range, testscores_50, label="testing 50 trees")
    plt.plot(depth_range, trainscores_50,label="training 50 trees")
    plt.legend()
    plt.xlabel('Max Depth')
    plt.ylabel('Testing accuracy')
    plt.title('ADA Accuracy with different max depths with 10 and 50 trees\n 60% test size\n'+setName)
    plt.savefig('./images/ada_max_depth_analysis_'+setName+'.png')
    #plt.show()
    plt.clf()


    # CV accuracy
    plt.title('ADA CV Avg Accuracy with different max depths with 10 and 50 trees \n'+ setName +"\n CV, Folds = 10")       
    plt.plot(depth_range, cv_10, label="10 trees")
    plt.plot(depth_range, cv_50,label="50 trees")
    plt.xlabel('Max Depth')
    plt.ylabel('CV Avg Testing accuracy')
    plt.legend()
    plt.savefig('./images/ada_max_depth_analysis_cv_'+setName+'.png')
    plt.clf()


    ###########################################################
    # Evaluate Model Complexity
    ###########################################################
    methods.modelComplexity(X,y, AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=10), AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=50),"ADA Boost Accuracy for increasing features and 10 vs 50 trees", "10 trees", "50 tress", "ada_model_complexity_analysis_cv_", setName  )    

    ###########################################################
    # Evaluate Training Size & Timing
    ###########################################################
    methods.trainingSize(X,y, AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=10), AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=50),"10 trees", "50 trees", "ada",setName) 


    '''
    # Evaluate training sizes with ensemble of 10 vs 50
    t_range = range(1,100,10)
    size_testscores_10 = []
    size_trainscores_10 = []
    size_testscores_50 = []
    size_trainscores_50 = []
    time_1 = []
    time_2 = []
    
    for t in t_range: 
        X_train, X_test, y_train, y_test = train_test_split(X,y, train_size= (t*0.01), random_state = 4)
        ada_10 = AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=10)        
        ada_10.fit(X_train, y_train)
        y_pred_train_10 = ada_10.predict(X_train)  
        y_pred_test_10 = ada_10.predict(X_test)
        size_trainscores_10.append(metrics.accuracy_score(y_train, y_pred_train_10))
        size_testscores_10.append(metrics.accuracy_score(y_test, y_pred_test_10))
        t1 = timeit.Timer(functools.partial(ada_10.fit,X_train,y_train))
        time_1.append(t1.timeit(1))

        X_train, X_test, y_train, y_test = train_test_split(X,y, train_size= (t*0.01), random_state = 4)
        ada_50 = AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=50)        
        ada_50.fit(X_train, y_train)
        y_pred_train_50 = ada_50.predict(X_train)  
        y_pred_test_50 = ada_50.predict(X_test)
        size_trainscores_50.append(metrics.accuracy_score(y_train, y_pred_train_50))
        size_testscores_50.append(metrics.accuracy_score(y_test, y_pred_test_50))
        t2 = timeit.Timer(functools.partial(ada_50.fit,X_train,y_train))        
        time_2.append(t2.timeit(1))
    
    plt.plot(t_range, size_trainscores_10,label="training 10 Trees")
    plt.plot(t_range, size_testscores_10,label="testing 10 Trees")
    plt.plot(t_range, size_trainscores_50,label="training 50 Trees")
    plt.plot(t_range, size_testscores_50,label="testing 50 Trees")


    plt.xlabel('Training Size Percentage')
    plt.ylabel('Testing accuracy')
    plt.title('ADA Accuracy for Different Training Size Percentages and Ensemble Size\n 60% test size, max depth = 1 \n'+ setName)
    plt.legend()
    plt.savefig('./images/ada_training_size_analysis_'+setName+'.png')
    #plt.show()
    plt.clf()

    # plot fit time
    plt.plot(t_range, time_1,label="10 trees fit time")
    plt.plot(t_range, time_2,label="50 trees fit time")
    plt.xlabel('Training Size Percentage')
    plt.ylabel('Fit Time')
    plt.title('ADA Fit Time for Different Training Size Percentages\n 10 vs 50 trees \n'+ setName)
    plt.legend()
    plt.savefig('./images/ada_fit_time_analysis_'+setName+'.png')
    plt.clf()

    '''

    # ROC CURVE
    # https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html
    # https://stackoverflow.com/questions/52910061/implementing-roc-curves-for-k-nn-machine-learning-algorithm-using-python-and-sci

    ada = AdaBoostClassifier(tree.DecisionTreeClassifier(max_depth=1), n_estimators=200)
    ada.fit(X_train, y_train)

    # Plotting ROC for all Classifiers
    '''
    y_pred_prob = ada.predict_proba(X_test)[:,1]

    fpr, tpr, thresholds = metrics.roc_curve(y_test, y_pred_prob)
    plt.plot(fpr,tpr)
    plt.xlim([0,1])
    plt.ylim([0,1])
    plt.title("Roc Curve for ADA classifier")
    plt.xlabel("False Positive Rate (1-specificity)")
    plt.ylabel("True Positive Rate (sensitivity)")
    plt.grid(True)
    plt.savefig('./images/boost_roc_analysis_'+setName+'.png')
    plt.show()

    plt.clf()
    print("AUROC:")
    print(metrics.roc_auc_score(y_test,y_pred_prob))

    # Calculate Cross-Validated AUC
    print(cross_val_score(ada, X, y, cv=10, scoring='roc_auc').mean())

    '''

def runExperiment():
    diabetes_dataSet = pd.read_csv("./data/diabetes_data_upload.csv")
    testAda(diabetes_dataSet,"Early Stage Diabetes Risk Prevention")
   

if __name__ == '__main__':
    # https://archive.ics.uci.edu/ml/datasets/Early+stage+diabetes+risk+prediction+dataset.
    #  Early stage diabetes risk prediction dataset. This dataset contains the sign and symptpom data of newly diabetic or would be diabetic patient.	
    # male set to 1, female set to 0, positive set to 1, negative set to 0, yes set to 1, no set to 0
    diabetes_dataSet = pd.read_csv("./data/diabetes_data_upload.csv")
    testAda(diabetes_dataSet,"Early Stage Diabetes Risk Prevention")


