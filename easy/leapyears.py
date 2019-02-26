# https://www.hackerrank.com/challenges/write-a-function/problem

import datetime

def is_leap(year):
    return (1900 <= year <= 10 ** 5) and ((year % 4 == 0 and year % 100 != 0) or (year % 400 == 0))

now = datetime.datetime.now()

for i in range(now.year):   #all years up to present year
    if is_leap(i):          #that pass the leap year test
        print(i)            #get printed 


def is_leap_brokendown(year):
    if year < 1900:         #get limitations out the way first
        return False
    if year > 10**5:
        return False
    if year % 400 == 0:     #if the year is a multiple of 400 it's definitely leap
        return True
    if year % 100 == 0:     #all years that are multiples of 400 but NOT 100 aren't leap
        return False
    if year % 4 == 0:       #all remaining years that are multiples of 4 ARE leap
        return True
    return False            #all remainig years after that aren't