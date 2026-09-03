const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /invitation: "https:\/\/lh3\.googleusercontent\.com\/d\/1IfuVMPdx4rUe72ch1yEr03vyOcJnRkI5",/,
  `invitation: "https://lh3.googleusercontent.com/d/1tXKzXKJ2481p6Lzrv1yUeECttiHAoShs",`
);

code = code.replace(
  /petalPeach: "https:\/\/lh3\.googleusercontent\.com\/d\/184uoDc8nTTdXsGVjUCVMWNRX4D9hX2Or",\s*petalMarigold: "https:\/\/lh3\.googleusercontent\.com\/d\/1BEJ31FsKdPKiyBPkJdYIOQ2cuobyj2Zv"/,
  `petalChampagne: "https://lh3.googleusercontent.com/d/1BfGaY2cDo-lToJ54Um6eZ0fcXllXGaK3",
  petalCream: "https://lh3.googleusercontent.com/d/19SFjIS-oXOOd8VkU82S3sthX_UMrGjLH",
  diyaFlame: "https://lh3.googleusercontent.com/d/1XKpN1JewQzjkDyqbQ8QcCFC4hzPZd6vM",
  incenseSmoke: "https://lh3.googleusercontent.com/d/1KXFjw5u-n8HVBVKKVXbKzMb6qiy_I9E5"`
);

fs.writeFileSync('src/App.tsx', code);
