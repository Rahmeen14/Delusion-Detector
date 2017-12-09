# -*- coding: utf-8 -*-
"""
Created on Fri Dec  8 20:47:01 2017

@author: hp
"""
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dataset = pd.read_csv(sys.argv[1])

X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, 2].values

#from sklearn.tree import DecisionTreeRegressor
#regressor2 = DecisionTreeRegressor(random_state = 0)
#regressor2.fit(X, y)



val = (float(sys.argv[2]))
from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators = 300,random_state = 0)
regressor.fit(X, y)
y_pred = regressor.predict(val);

print(y_pred)
X_grid = np.arange(min(X), max(X), 0.01) 
X_grid = X_grid.reshape((len(X_grid), 1))
plt.scatter(X, y, color = 'red')
plt.plot(X_grid, regressor.predict(X_grid), color = 'blue')
plt.title('Truth or Bluff (DRT)')
plt.xlabel('Position level')
plt.ylabel('Salary')
plt.show()


sys.stdout.flush()