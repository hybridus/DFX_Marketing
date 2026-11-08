import numpy as np, wave, subprocess, os
SR=44100; DUR=166.0
N=int(SR*DUR)
rng=np.random.default_rng(7)
def tt(d): return np.arange(int(SR*d))/SR
def env(n,a=0.005,r=0.1):
    e=np.ones(n); na=max(1,int(a*SR)); nr=max(1,int(r*SR))
    e[:na]=np.linspace(0,1,na); e[-nr:]=np.minimum(e[-nr:],np.linspace(1,0,nr)); return e
def place(buf,sig,t,g=1.0):
    i=int(t*SR); j=min(N,i+len(sig))
    if i<N: buf[i:j]+=sig[:j-i]*g
def sine(f,d,a=0.003,r=0.15): x=tt(d); return np.sin(2*np.pi*f*x)*env(len(x),a,r)
def tick(): return sine(1800,0.05,0.001,0.04)*0.5+sine(900,0.05,0.001,0.04)*0.3
def click(): 
    x=tt(0.06); return rng.standard_normal(len(x))*np.exp(-x*90)*0.6
def chime(): return (sine(1320,0.5,0.004,0.4)+0.6*sine(1760,0.5,0.004,0.35)+0.3*sine(2640,0.5,0.004,0.25))*0.4
def confirm(): return np.concatenate([sine(880,0.12,0.003,0.08),sine(1320,0.3,0.003,0.25)])*0.5
def blip(): return sine(660,0.09,0.002,0.07)*0.5
def thud():
    x=tt(0.7); f=90*np.exp(-x*5); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph)*np.exp(-x*6)*0.9+rng.standard_normal(len(x))*np.exp(-x*40)*0.2
def stamp():
    x=tt(0.5); return (np.sin(2*np.pi*140*x)*np.exp(-x*14)+rng.standard_normal(len(x))*np.exp(-x*60)*0.5)*0.8
def whoosh(d=0.8,f0=300,f1=2500):
    x=tt(d); n=rng.standard_normal(len(x)); f=np.linspace(f0,f1,len(x))
    # crude bandpass via modulation of filtered noise
    y=n*np.sin(2*np.pi*np.cumsum(f)/SR)
    y=np.convolve(y,np.ones(8)/8,'same')
    return y*np.sin(np.pi*np.linspace(0,1,len(x)))**2*0.5
def sweep(d):
    x=tt(d); f=300+900*(x/d)**1.5; s=np.sin(2*np.pi*np.cumsum(f)/SR)
    lfo=0.5+0.5*np.sin(2*np.pi*3.2*x)
    return s*lfo*np.sin(np.pi*np.minimum(x/1.5,1))*np.minimum(1,(d-x)/1.5)*0.18
def hum(d,f=70):
    x=tt(d); s=np.sin(2*np.pi*f*x)+0.5*np.sin(2*np.pi*f*2*x)+0.25*np.sin(2*np.pi*f*3*x)
    return s*np.sin(np.pi*x/d)**1.5*0.4
def swell(d=3.5):
    x=tt(d); s=sum(np.sin(2*np.pi*f*x) for f in (110,165,220,330))*0.25
    return s*(x/d)**2*np.minimum(1,(d-x)/1.2)*0.8
cue=np.zeros(N)
place(cue,click(),35.6,0.8); place(cue,chime(),36.2); place(cue,tick(),37.0)
for t in (39.5,41.0,42.2,43.8,45.2): place(cue,tick(),t)
place(cue,confirm(),47.2)
place(cue,blip(),57.0); place(cue,tick(),59.0); place(cue,tick(),61.5)
place(cue,sweep(10.4),66.2)
for t in (68,70.5,73,75.5): place(cue,blip(),t,0.5)
place(cue,confirm(),77.0)
for t in (79.5,81.5,83.5): place(cue,tick(),t)
place(cue,thud(),89.4); place(cue,blip(),90.2)
place(cue,chime(),95.6,0.8)
place(cue,stamp(),97.2); place(cue,tick(),99.0); place(cue,tick(),101.0)
place(cue,whoosh(1.4,200,1800),105.4)
for k in range(8): place(cue,whoosh(0.5,500,2600),106.2+k*0.3,0.45)
place(cue,tick(),111.5); place(cue,tick(),113.8); place(cue,tick(),116.5)
place(cue,tick(),128.8); place(cue,tick(),131.0); place(cue,confirm(),133.0)
place(cue,hum(3.4),133.2)
place(cue,tick(),135.2); place(cue,tick(),140.4); place(cue,confirm(),146.2)
place(cue,tick(),150.8); place(cue,hum(4.0,60),153.2)
place(cue,swell(),157.0); place(cue,chime(),160.2,0.9)
# ambient bed
x=np.arange(N)/SR
bed=(np.sin(2*np.pi*55*x)*0.5+np.sin(2*np.pi*82.5*x+0.4*np.sin(2*np.pi*0.07*x))*0.3+np.sin(2*np.pi*110.3*x)*0.15)
bed*=0.6+0.4*np.sin(2*np.pi*0.05*x)
nz=np.convolve(rng.standard_normal(N),np.ones(200)/200,'same')*3
bed=bed+nz*0.25
fade=np.minimum(1,np.minimum(x/3,(DUR-x)/3)); bed*=fade
def wr(name,sig,g):
    sig=sig/ (np.max(np.abs(sig))+1e-9)*g
    s=(np.clip(sig,-1,1)*32767).astype('<i2')
    with wave.open(name,'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(s.tobytes())
wr('bed.wav',bed,0.5); wr('cues.wav',cue,0.8)
print('ok')
