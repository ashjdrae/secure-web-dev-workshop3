Bonjour,

J'ai réalisé une CRUD API web sécurisée sur les lieux de tournage à Paris.
Celle-ci utilise des users avec authentifications et permissions (CRUD options également)
Pour run le code, il faut ouvrir insomnia, postman, ou un navigateur Web et entrer des requêtes.
L'adresse du site est indiquée dans la console quand le code est run

Il faut d'abord commencer par se créer un compte (/users/register), en remplissant le json body
Il faut ensuite se login, indispensable pour accéder aux autres fonctionnalités (/users/login),
en remplissant le json body.
Vous pourrez ensuite accéder à toutes les fonctionnalités du code, les chemins sont spécifiés dans
le user controller et dans le location controller. Les noms des chemins sont explicites, vous saurez
donc lequel choisir selon ce que vous souhaitez faire. Lorsque vous faites une requête, il faut bien penser à mettre votre token, obtenu après le login, pour que l'autorisation vous soit accordée

Certaines fonctionnalités ne sont accessibles que si vous avez un compte admin.
Si vous souhaitez accéder à toutes les fonctionnalités, il faudra s'en créer un. Pour cela, la solution la plus simple est d'aller dans le dossier auth puis le fichier local.strategy, et le modifier : modifier la fonction Register. Par défaut, celle-ci attribue le rôle "basic_user" aux users créés, dans le but de ne pas attribuer plus de permissions que nécessaires aux nouveaux users créés. Il vous suffit donc de remplacer "basic_user par "admin". Pensez après avoir créé le compte admin, à bien remodifier et remettre "basic_user" pour éviter que les futurs users créés ne soient tous admin.

Le fichier .env contient les informations de connexion, il est indispensable de modifier le MONGO_URI en fonction de votre chaîne de connexion à votre database mongoDB

Le code a également été passé sur SonarCloud pour supprimer le plus de Code Smell possibles.
Voici le lien :
https://sonarcloud.io/summary/overall?id=ashjdrae_secure-web-dev-workshop3

Joyeuses fêtes de fin d'année