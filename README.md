<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Service d'authentification, comprenant : 
- une inscription déclenchant une notification slack, ainsi qu'une demande de confirmation envoyée par mail
- une connexion renvoyant un access token


## Comment lancer le projet

```bash
$ docker-compose up
```

## Questions

**- Que faudrait-il changer/optimiser sur cette api/infra pour encaisser +500 appels/seconde ?**

Pour optimiser son API et s'assurer qu'elle puisse encaisser de nombreuses appels à la seconde, il faut tout d'abord s'assurer que la base de données soit assez robuste et conséquente pour échanger de nombreuses données, mais également optimiser ses appels à cette dernière ou à des services externes, de sorte à ne pas faire d'échange de données inutiles.
</br>De plus, il faut également faire attention à utiliser les méthodes asynchrones de manière judicieuse.
</br>Et finalement, il faut s'assurer que son serveur soit également assez robuste et puisse accepter autant de connexion et d'appel.

**- Que faudrait-il faire pour sécuriser au maximum cette api ?**

Afin de sécuriser cette API, il faudra tout d'abord utiliser le protocole HTTPS, il faudra intégrer le JWT si d'autres routes sont implémentées, et selon l'utilisation de l'API pourquoi pas intégrer un système de clé API pour pouvoir la consommer.
