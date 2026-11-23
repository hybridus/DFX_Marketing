import sys,json
from PIL import Image
for n in sys.argv[1:]:
    p=f'stills/op_{n}.png';im=Image.open(p);bb=im.getbbox();m=30
    box=(max(bb[0]-m,0),max(bb[1]-m,0),min(bb[2]+m,im.size[0]),min(bb[3]+m,im.size[1]));im.crop(box).save(p)
    A=json.load(open(f'stills/op_{n}.json'));B=A.pop('_blocks',[]);A={k:[v[0]-box[0],v[1]-box[1]] for k,v in A.items()};A['_blocks']=[[b[0]-box[0],b[1]-box[1],b[2]] for b in B];A['_size']=[box[2]-box[0],box[3]-box[1]]
    json.dump(A,open(f'stills/op_{n}.json','w'))
