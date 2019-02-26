# https://www.hackerrank.com/challenges/no-idea/forum

import random
import time
import string

arr = "5 5\n999999991 999999992 999999993 999999994 999999999\n999999991 999999993 999999995 999999999 999999997\n999999990 999999992 999999996 999999998 999999994"
arr = arr.strip().split("\n")
def input():
    return arr.pop(0)

class SpeedTest:
    def __init__(self, t):
        if t == "number":
            self.A = [random.randint(1, 100) for x in range(random.randint(50, 200))]
        if t == "strings":
            self.A = [random.choice(string.ascii_letters) for x in range(random.randint(50, 200))]

    def sort(self, f):
        start = time.time()
        sort = f(self.A)
        finish = time.time()
        for i in range(len(sort) - 1):
            if sort[i] > sort[i + 1]:
                return None
        return finish - start

class Sorting:

    def sorted(self, _list):                        #10^-6 speed for size-200 data
        return sorted(_list)                        #Timsort

    def merge_sort(self, _list):                    #10-^-5 speed for size-200 data, order nlogn
        if len(_list) > 1:
            mid = len(_list) // 2
            left = _list[:mid]
            right = _list[mid:]
            self.merge_sort(left)
            self.merge_sort(right)                   #keep splitting the list until we reach single unit lists
            i = 0
            j = 0
            k = 0
            while i < len(left) and j < len(right):
                if left[i] < right[j]:
                    _list[k] = left[i]
                    i = i + 1
                else:
                    _list[k] = right[j]
                    j = j + 1
                k = k + 1
            while i < len(left):
                _list[k] = left[i]
                i = i + 1
                k = k + 1
            while j < len(right):
                _list[k] = right[j]
                j = j + 1
                k = k + 1
        return _list

    def count_sort(self, _list):                              #10^-4 runtime for data size 200, O(nlog(n))
        counter = []                                          #list not dict to maintain ordered iteration
        for x in _list:
            if x >= len(counter):                             #if the list is too short, extend it and add a bunch of 0s
                counter.extend([0] * (x - len(counter) + 1))
            counter[x] = counter[x] + 1                       #increment that value within the list for every element passed
        output = []
        for key in range(len(counter)):
            value = counter[key]
            output.extend([key for i in range(value)])        #generate a new list based on the key-value pairs
        return output                                         #not a stable sort

#st = SpeedTest("number")
#_Sorting = Sorting()
#print(st.sort(_Sorting.merge_sort))
#print(st.sort(_Sorting.count_sort))
#print(st.sort(sorted))

class NoIdea:    
    def __init__(self, nm, base, A, B):
        x = list(map(int, nm.split()))
        _Sorting = Sorting()
        self.n = x[0]
        self.m = x[1]
        self.base = _Sorting.count_sort(list(map(int, base.split())))
        self.A = _Sorting.count_sort(list(map(int, A.split())))
        self.B = _Sorting.count_sort(list(map(int, B.split())))
        [A, B] = self.splitter()
        print(A - B)

    def splitter(self):
        data = [self.A, self.B]
        count = [0] * len(data)
        for n in range(len(data)):
            i = 0
            for x in data[n]:
                while self.base[i] <= x:
                    if self.base[i] == x:
                        count[n] = count[n] + 1
                        break
                    i = i + 1
                    if i >= len(self.base):
                        break                
                if i >= len(self.base):
                    break
        return count
        
y = [input(), input(), input(), input()]
NoIdea(*y)