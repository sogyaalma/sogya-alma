fetch('https://linktr.ee/sogyaalma', {headers: {'User-Agent': 'Mozilla/5.0'}})
  .then(r => r.text())
  .then(html => {
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
    if(match) {
      const data = JSON.parse(match[1]);
      const links = data.props.pageProps.account.links.map(l => ({title: l.title, url: l.url}));
      console.log(JSON.stringify(links, null, 2));
    } else {
      console.log('no match');
    }
  });
