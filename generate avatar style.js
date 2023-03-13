const avatarStyles = [
    'male',
    'female',
    'human',
    'identicon',
    'initials',
    'avataaars',
    'bottts',
    'jdenticon',
    'gridy',
    'micah'
  ];
  
  function getRandomAvatarStyle() {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  }
  
  function generateRandomAvatar(userName) {
    const avatarStyle = getRandomAvatarStyle();
    const avatarUrl = `https://avatars.dicebear.com/api/${avatarStyle}/${userName}.svg`;
    const altText = `Avatar for ${userName}`;
    const imageTag = `<img src="${avatarUrl}" alt="${altText}">`;
  
    return {
      avatarUrl,
      imageTag
    };
  }
  