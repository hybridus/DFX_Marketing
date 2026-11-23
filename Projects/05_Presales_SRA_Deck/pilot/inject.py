import zipfile,json,re,sys
import sys
src,dst,bj=sys.argv[1],sys.argv[2],sys.argv[3]
builds={int(k):v for k,v in json.load(open(bj)).items()}
zin=zipfile.ZipFile(src); zout=zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED)
def timing(ids_by_click):
    n=[2]
    def nid(): n[0]+=1; return n[0]
    clicks=''; bld=''
    for grp in ids_by_click:
        effs=''
        for j,(sid,kind) in enumerate(grp):
            node='clickEffect' if j==0 else 'withEffect'
            effs+=(f'<p:par><p:cTn id="{nid()}" presetID="10" presetClass="entr" presetSubtype="0" fill="hold" grpId="0" nodeType="{node}"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
                   f'<p:set><p:cBhvr><p:cTn id="{nid()}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="{sid}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>'
                   f'<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="{nid()}" dur="500"/><p:tgtEl><p:spTgt spid="{sid}"/></p:tgtEl></p:cBhvr></p:animEffect></p:childTnLst></p:cTn></p:par>')
            if kind=='sp': bld+=f'<p:bldP spid="{sid}" grpId="0" animBg="1"/>'
            if kind=='txt': bld+=f'<p:bldP spid="{sid}" grpId="0"/>'
        a,b=nid(),nid()
        clicks+=(f'<p:par><p:cTn id="{a}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="{b}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>{effs}</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>')
    return ('<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
            +clicks+'</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst>'
            +(f'<p:bldLst>{bld}</p:bldLst>' if bld else '')+'</p:timing>')
for item in zin.infolist():
    if item.filename.endswith('/'): continue
    data=zin.read(item.filename)
    m=re.match(r'ppt/slides/slide(\d+)\.xml$',item.filename)
    if m and int(m.group(1)) in builds:
        x=data.decode('utf-8')
        ids={}
        for mm in re.finditer(r'<p:(pic|sp|cxnSp)>(.*?)</p:\1>',x,re.S):
            blk=mm.group(2); nm=re.search(r'<p:cNvPr id="(\d+)" name="([^"]*)"',blk)
            if nm: ids[nm.group(2)]=(nm.group(1),mm.group(1),'txBox="1"' in blk)
        groups=[]
        for grp in builds[int(m.group(1))]:
            g=[]
            for nm in grp:
                sid,kind,tb=ids[nm]; g.append((sid,'pic' if kind=='pic' else ('txt' if tb else 'sp')))
            groups.append(g)
        x=x.replace('</p:sld>',timing(groups)+'</p:sld>')
        data=x.encode('utf-8')
    zout.writestr(item,data)
zout.close(); print('injected')
