# Wintr main website 


### Deployment

Le site est deploy en utilisant la plateforme de [Vercel's](https://vercel.com/wintr).
L'hebergement est fourni et ils font tourner les fonctions en Function as a Service.

Une partie backend tourne sur Google Cloud (Pub/Sub pour l'asynchrone et Firestore pour le stockage
des données).

Le site est en Continuous Deployment : pour chaque commit dans la branche principale ,
la prod est mise à jour, idem pour la preprod.

## Branches

On utilise les branches suivantes :

* `master` : production visible sur https://www.wintr.travel 
* `staging` : preprod visible sur https://beta.wintr.travel

## Services tiers 

Service | Usage | URL
--- | --- | ---
Sendinblue | Mail transactionnel (mail/SMS) + campagne mail/facebook + CRM|https://my.sendinblue.com/
Sentry |Monitoring des erreurs|https://sentry.io/auth/login/
Google Analytics |Suivi de l'activite sur le site + funnel de conversion|https://analytics.google.com/
