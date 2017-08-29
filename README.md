# VirtuART

1. In config directory, you will need to create an aws.json file with the following structure:
```
{
  "AwsAccessKeyId": "[ALL CAPS TOKEN]"
  "AwsSecretAccessKey": "[MIXED CASE TOKEN]"
}
```

2. Requires MONGO database, named 'VIRTUAL_ART_DB'
    a. With collection named "artCollection"
    b. With collection named "artists"