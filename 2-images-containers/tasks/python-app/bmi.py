print('(1) Metric (m, kg) or (2) Non-Metric (ft, pounds)?')

chosen_system = input('Please choose: ')

if(chosen_system != '1' and chosen_system != '2'):
    print('You have to choose either metric or non-metric. Shutting down...')
    exit()

HEIGHT_UNIT = 'meters'
WEIGHT_UNIT = 'kilograms'

if (chosen_system == '2'):
    HEIGHT_UNIT = 'feet'
    WEIGHT_UNIT = 'pounds'

try:
    print('Please enter your height in ' + HEIGHT_UNIT)
    user_height = float(input('Your height: '))

    print('Please enter your weight in ' + WEIGHT_UNIT)
    user_weight = float(input('Your weight: '))
except: 
   print('Invalid input - shutting down ...')
   exit()

adj_height = user_height
adj_weight = user_weight

if(chosen_system == '2'):
    adj_height = user_height / 3.28084
    adj_weight = user_weight / 2.20462

bmi = adj_weight / (adj_height * adj_height)

print('Your body-mass-index: ' + str(bmi))