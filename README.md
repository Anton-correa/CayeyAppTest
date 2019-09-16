# CayeyAppTest
A ticketing system that handles tickets submitted by the user to be handled by the local county

This system is a prototype ticketing system created using electron.js that lets the user create a ticket or edit an already created ticket
and these tickets are stored in a local database. The program is mostly uses javascript and html, but also uses php to handle the logins
in the system.

The file called main.js handles the management of all the pages that are going to be displayed when running the program. The pages that are
viewed were made using materialize.css to alter the appearences. Some of the functions that uses to generate a pdf as a report are from the
packege of jspdf, and the function to upload the ticket table to an excel file uses a package called xlsx. To access the local database in
for the system MySQL was used.
