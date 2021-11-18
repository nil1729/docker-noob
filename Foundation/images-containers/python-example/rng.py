from random import randint

try:
    min_number = int(input('Please enter the min number: '))
    max_number = int(input('Please enter the max number: '))

    if max_number < min_number:
        raise Exception('Invalid Input')
    rnd_number = randint(min_number, max_number)
    print(rnd_number)
except:
    print('Invalid input - shutting down ...')


