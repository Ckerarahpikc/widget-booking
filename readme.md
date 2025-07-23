frontend build with vite (nothing yet)
backend build with nestjs/cli (basic configuration with nodemailer)

LOGIC: 
* user already logged in:
1. create reservation
2. save reservation
3. confirm reservation
4. chill

* user not logged in (doesn't have account yet)
1. generate token
2. create and save 'booking_confirmation' set with 'isConfirmed' to 0
3. send mail message to the gmail with the intention to verify the reservation
4. after confirming the reservation create one with the respective data and save the reservation