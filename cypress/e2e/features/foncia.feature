Feature: Recherche d'appartement sur le site Foncia

  Background:
    Given L'utilisateur accède au site Foncia

Scenario: Vérification des éléments de la page d'accueil
    When L'utilisateur visite la page d'accueil
    Then La page d'accueil doit comporter toutes les rubriques

#   Scenario: Recherche d'un appartement à louer à Paris avec un loyer MAX 1500€
#     When L'utilisateur effectue une recherche avec les critères "Louer un appartement à Paris avec un loyer MAX 1500€"
#     Then Les résultats de la recherche devraient inclure des appartements avec un loyer maximal de 1500€



 