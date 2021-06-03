import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import metrics
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np



from sklearn.neighbors import KNeighborsClassifier
from sklearn import tree
from sklearn import metrics
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier

from sklearn.model_selection import cross_val_score
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
import timeit, functools
import seaborn as sns
import random

from sklearn.model_selection import learning_curve
from sklearn.model_selection import ShuffleSplit
import matplotlib.ticker as mtick

def dataAnalysis():
    random.seed(5)
    np.random.seed(5)
    dataSet = pd.read_csv("./data/diabetes_data_upload.csv")
    X = dataSet.iloc[:,:-1].values 
    y = dataSet.iloc[:,-1].values

    print("\nPerforming Data Analysis")
    print("\nFor the Diabetes Dataset")
    print("The Data's X shape is:")
    print(X.shape)
    print("The Data's X shape is:")
    print(y.shape)
    print("The Data's Age max value are:")
    print(X[1::].max())
    print("The Data's Age min value are:")
    print(X[1::].min())
    print("The Data's Y value counts are is:")
    unique, counts = np.unique(y, return_counts=True)
    print(np.asarray((unique, counts)).T)
   

    avg = X.mean(axis=0)
    plt.ylabel("Value")
    plt.xlabel("Diabetes Data")
    plt.title("Diabetes Data Averages")
    plt.bar(np.arange(len(avg)),avg)
    plt.savefig('./images/data-analysis-diabetes-avg.png')
    #plt.show()
    plt.clf()
    
    medianX = np.median(X, axis =0)
    plt.ylabel("Value")
    plt.xlabel("Diabetes Data")
    plt.title("Diabetes Data Median")
    plt.bar(np.arange(len(medianX)),medianX)
    plt.savefig('./images/data-analysis-diabetes-median.png')
    #plt.show()
    plt.clf()

    stdX = np.std(X, axis =0)
    plt.ylabel("Value")
    plt.xlabel("Diabetes Data")
    plt.title("Diabetes Data Standard Deviation")
    plt.bar(np.arange(len(stdX)),stdX)
    plt.savefig('./images/data-analysis-diabetes-std.png')
    #plt.show()
    plt.clf()


    


    # CORR MATRIXS
    headers = ["Polydipsia","sudden weight loss", "weakness", "Polyphagia", "Genital thrush", "visual blurring", "Itching", "Irritability", "delayed healing", "partial paresis", "muscle stffness", "Alopecia", "Obesity", "CLASS"]
    print("Creating CORR MATRIX:")
    dataSet = pd.read_csv("./data/diabetes_data_upload.csv", names=headers)
    cor = dataSet.corr()
    plt.figure(figsize=(12,10))
    sns.heatmap(cor, annot=True, cmap=plt.cm.Reds)
    plt.savefig('./images/data-analysis-diabetes-corr.png')
    #plt.show()
    plt.clf()


def getConfusion(y_test,y_pred_class):
    random.seed(5)
    np.random.seed(5)


    confusion = metrics.confusion_matrix(y_test, y_pred_class)
    print(confusion)
    TP = confusion[1,1]
    TN = confusion[0,0]
    FP = confusion[0,1]
    FN = confusion[1,0]
    # Classificiation Accuracy: 
    # You want to maximize this!
    print("Accuracy:")
    print(  ((TP+TN) / (TP+TN+FP+FN)))
    #print(metrics.accuracy_score(y_test, y_pred_class ))


    # Misclassificiation Rate: 
    print("Misclassificiation rate:")
    print(  ((FP+FN) / (TP+TN+FP+FN)))
    #print(1-metrics.accuracy_score(y_test, y_pred_class ))



    # True Positive Rate, Recall or Sensitivity 
    # How well can the learner predict positive instances?
    # How sensitive the classifier is to predicting positive instances
    # You want to maximize this!
    print("Sensitivity:")
    print(  ((TP) / (TP+FN)))
    #print(metrics.recall_score(y_test, y_pred_class ))

    # Specificity
    # When the actual value is negative how often is the learner correct? 
    # You want to maximize this! Best value would be one
    print("Specificity:")
    print(  ((TN) / (TN+FP)))

    # False Positive Rate,
    # When the actual value is negative, how often is the prediction incorrect?
    # You want to MINIMIZE this
    print("False Positive Rate:")
    print(  ((FP) / (TN+FP)))

    # Precision:
    # When a positive value is predicted, how often is the learner correct? 
    # How precise the classifier is when predicting a positive instance
    print("Precision:")
    print(  ((TP) / (TP+FP)))
    #print(metrics.precision_score(y_test, y_pred_class))
    print("\n")


###########################################################
# Evaluate Model Complexity
###########################################################

# see https://scikit-learn.org/stable/modules/feature_selection.html

def modelComplexity(X,y, learner1, learner2, title, label1, label2, filename, setName): 
    random.seed(5)
    np.random.seed(5)

    f_range = range(1, X.shape[1])
    cv_1 = []
    cv_2 = []
    X_train, X_test, y_train, y_test = train_test_split(X,y, test_size= 0.4, random_state = 4)

    trainscores_1 = []
    trainscores_2 = []

    #print("Evaluating Model Complexity for "+ setName)    
    for f in f_range: 
        X_new = SelectKBest(chi2, k=f).fit_transform(X_train, y_train)
        #print(X_new)
        cvscores1 = cross_val_score(learner1, X_new, y_train, cv=10,n_jobs=-1)
        cv_1.append(cvscores1.mean())
        cvscores2 = cross_val_score(learner2, X_new, y_train, cv=10,n_jobs=-1)
        cv_2.append(cvscores2.mean())
        learner1.fit(X_new, y_train)
        y_pred_train_1 = learner1.predict(X_new) 
        trainscores_1.append(metrics.accuracy_score(y_train, y_pred_train_1))
        learner2.fit(X_new, y_train)
        y_pred_train_2 = learner2.predict(X_new) 
        trainscores_2.append(metrics.accuracy_score(y_train, y_pred_train_2))
    

    # Plot CV Accuracy for Model Complexity
    plt.title(title+'\n'+ setName +"\n CV, Folds = 10")
    plt.plot(cv_1,label="CV "+label1,linestyle="-", linewidth=3)
    plt.plot( cv_2,label="CV "+label2, linestyle="-.", linewidth=3)
    plt.plot(trainscores_1,label="training "+label1, linestyle=":", alpha=0.7)
    plt.plot(trainscores_2,label="training "+label2, alpha=0.8)
    plt.xlabel('Number of features')
    plt.ylabel('Avg CV Testing accuracy')
    plt.legend()
    plt.savefig('./images/'+filename+setName+'.png')
    #plt.show()
    plt.clf()


###########################################################
# Evaluate Training Size & Timing
###########################################################
def trainingSize(X,y, learner1, learner2, label1, label2, learnerName, setName): 
    random.seed(5)
    np.random.seed(5)

    # Evaluate training sizes
    t_range = range(10,100,10)
    size_testscores_1 = []
    size_trainscores_1 = []
    size_testscores_2 = []
    size_trainscores_2 = []
    #cv_1 = []
    #cv_2 = []
    time_1 = []
    time_1q = []
    time_2 = []
    time_2q = []


    for t in t_range: 
        X_train, X_test, y_train, y_test = train_test_split(X,y, train_size= (t*0.01), random_state = 4)
        learner1.fit(X_train, y_train)
        y_pred_train_1 = learner1.predict(X_train)  
        y_pred_test_1 = learner1.predict(X_test)
        size_trainscores_1.append(metrics.accuracy_score(y_train, y_pred_train_1))
        size_testscores_1.append(metrics.accuracy_score(y_test, y_pred_test_1))
        #cvscores1 = cross_val_score(learner1, X_train, y_train, cv=10, n_jobs=-1)
        #cv_1.append(cvscores1.mean())
        t1 = timeit.Timer(functools.partial(learner1.fit,X_train,y_train))
        time_1.append(t1.timeit(1))
        t1q = timeit.Timer(functools.partial(learner1.predict,X_train))
        time_1q.append(t1q.timeit(1))

        learner2.fit(X_train, y_train)
        y_pred_train_2 = learner2.predict(X_train)  
        y_pred_test_2 = learner2.predict(X_test)
        size_trainscores_2.append(metrics.accuracy_score(y_train, y_pred_train_2))
        size_testscores_2.append(metrics.accuracy_score(y_test, y_pred_test_2))
        #cvscores2 = cross_val_score(learner2, X_train, y_train, cv=10, n_jobs=-1)
        #cv_2.append(cvscores2.mean())
        t2 = timeit.Timer(functools.partial(learner2.fit,X_train,y_train))        
        time_2.append(t2.timeit(1))
        t2q = timeit.Timer(functools.partial(learner2.predict,X_train))
        time_2q.append(t2q.timeit(1))

    # Plot training vs testing 
    plt.plot(t_range, size_trainscores_1,label="training "+label1, alpha=0.7)
    plt.plot(t_range, size_testscores_1,label="testing "+label1, linestyle='--')
    plt.plot(t_range, size_trainscores_2,label="training "+label2, alpha=0.7)
    plt.plot(t_range, size_testscores_2,label="testing "+label2, linestyle='--')
    plt.xlabel('Training Size Percentage')
    plt.ylabel('Testing accuracy')
    plt.title(learnerName.upper() + ' Accuracy for Different Training Size Percentages: \n'+ setName)
    plt.legend()
    plt.savefig('./images/'+learnerName+'_training_size__accuracy_analysis_'+setName+'.png')
    #plt.show()
    plt.clf()

    # Plot training vs testing CV
    # CV accuracy
    '''
    plt.title(learnerName.upper()+' CV Avg Accuracy for Different Training Size Percentages: \n'+ setName +"\n CV, Folds = 10")
    plt.plot(t_range, cv_1,label=label1, alpha=0.7)
    plt.plot(t_range, cv_2,label=label2, linestyle='--')
    plt.xlabel('Training Size %')
    plt.ylabel('CV Avg Testing accuracy')
    plt.legend()
    plt.savefig('./images/'+learnerName+'_training_size_analysis_cv_'+setName+'.png')
    plt.clf()
    '''
    # plot fit time
    plt.plot(t_range, time_1,label=label1+" fit time", alpha=0.7)
    plt.plot(t_range, time_2,label=label2+" fit time", alpha=0.7)
    plt.plot(t_range, time_1q,label=label1+" training query time",linestyle='--')
    plt.plot(t_range, time_2q,label=label2+" training query time",linestyle='--')
    plt.xlabel('Training Size Percentage')
    plt.ylabel('Fit Time')
    plt.title(learnerName.upper() +' Fit & Query Time for Different Training Size Percentages\n '+label1 +' vs '+label2+'\n'+ setName)
    plt.legend()
    plt.savefig('./images/'+learnerName+'_time_analysis_'+setName+'.png')
    #plt.show()
    plt.clf()




    ###########################################################
    # Evaluate Training Size & Timing 2
    ###########################################################
    '''
    train_sizes, train_scores, test_scores = learning_curve(estimator=learner1,X=X, y=y, train_sizes=np.linspace(.1, 1.0, 5), cv = 10, scoring='accuracy')

    train_scores_mean = np.mean(train_scores, axis=1)*100
    train_scores_std = np.std(train_scores, axis=1)
    test_scores_mean = np.mean(test_scores, axis=1)*100
    test_scores_std = np.std(test_scores, axis=1)

    plt.plot(train_sizes, train_scores_mean, label = 'Training Accuarcy')
    plt.plot(train_sizes, test_scores_mean, label = 'Cross-validation Accuarcy')
    plt.ylabel('Accuracy', fontsize = 14)
    plt.xlabel('Training set size', fontsize = 14)
    plt.title('Learning curves for '+label1, fontsize = 18, y = 1.03)
    #plt.gca().set_xticklabels(['{:.0f}%'.format(x*100) for x in plt.gca().get_yticks()]) 
    plt.legend()
    plt.show()
    '''

