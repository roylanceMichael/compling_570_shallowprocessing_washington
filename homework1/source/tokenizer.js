function Tokenizer() {
	this.regexTokens = [
		// one I've used for a while for emails
		/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
		// currency regex
		/^\$?[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/,
		// url regex
		/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/,
		// phone # regex
		/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
		// all words
		/^[A-Za-z0-9\-]+$/,
		// all single chars that aren't numbers
		/^[^A-Za-z0-9\s]$/
	];

	// big long abbreviation object comparison
	this.abbrevObj = { 'ph.d':'true', 'u.s.a':'true', 'mr.':'true', 'mrs.':'true', 'ms.':'true', 'a. (in etym.)':'true','a (as a 1850)':'true','a.':'true','abbrev.':'true','abl.':'true','absol.':'true','abstr.':'true','acc.':'true','acct.':'true','a.d.':'true','ad. (in etym.)':'true','add.':'true','adj.':'true','adv.':'true','adv.':'true','advb.':'true','advt.':'true','aeronaut.':'true','af.':'true','afr.':'true','afr.':'true','agric.':'true','alb.':'true','amer.':'true','amer. ind.':'true','anat.':'true','anc.':'true','anglo-ind.':'true','anglo-ir.':'true','ann.':'true','anthrop.':'true','anthropol.':'true','antiq.':'true','aphet.':'true','app.':'true','appl.':'true','applic.':'true','appos.':'true','arab.':'true','aram.':'true','arch.':'true','arm.':'true','assoc.':'true','astr.':'true','astrol.':'true','astron.':'true','astronaut.':'true','attrib.':'true','austral.':'true','autobiogr.':'true','a.v.':'true','b.c.':'true','b.c.':'true','bef.':'true','bibliogr.':'true','biochem.':'true','biol.':'true','bk.':'true','bot. (as label) in botany; (in titles) botany':'true','-icalbp.':'true','brit.':'true','bulg.':'true','bull.':'true','c (as c 1700)':'true','c. (as 19th c.)':'true','cal.':'true','cambr.':'true','canad.':'true','cat.':'true','catachr.':'true','catal.':'true','celt.':'true','cent.':'true','cent. dict.':'true','cf.':'true','cf.':'true','ch.':'true','chem.':'true','chr.':'true','chron.':'true','chronol.':'true','cinemat.':'true','cinematogr.':'true','clin.':'true','cl. l.':'true','cogn. w.':'true','col.':'true','coll.':'true','collect.':'true','colloq.':'true','comb.':'true','comb.':'true','comm.':'true','communic.':'true','comp.':'true','compan.':'true','compar.':'true','compl.':'true','compl.':'true','conc.':'true','conch.':'true','concr.':'true','conf.':'true','congr.':'true','conj.':'true','cons.':'true','const.':'true','contr.':'true','contrib.':'true','corr.':'true','corresp.':'true','cotgr.':'true','cpd.':'true','crit.':'true','cryst.':'true','cycl.':'true','cytol.':'true','da.':'true','d.a.':'true','d.a.e.':'true','dat.':'true','d.c.':'true','deb.':'true','def.':'true','dem.':'true','deriv.':'true','derog.':'true','descr.':'true','devel.':'true','diagn.':'true','dial.':'true','dict.':'true','dim.':'true','dis.':'true','diss.':'true','d.o.s.t.':'true','du.':'true','e.':'true','eccl.':'true','ecol.':'true','econ.':'true','ed.':'true','e.d.d.':'true','edin.':'true','educ.':'true','ee.':'true','e.g.':'true','electr.':'true','electron.':'true','elem.':'true','ellipt.':'true','embryol.':'true','e.midl.':'true','encycl.':'true','eng.':'true','engin.':'true','ent.':'true','entomol.':'true','erron.':'true','esp.':'true','ess.':'true','et al.':'true','etc.':'true','ethnol.':'true','etym.':'true','euphem.':'true','exam.':'true','exc.':'true','exerc.':'true','exper.':'true','explor.':'true','f.':'true','f.':'true','f. (in subordinate entries)':'true','f.':'true','fem. (rarely f.)':'true','fig.':'true','finn.':'true','fl.':'true','found.':'true','fr.':'true','freq.':'true','fris.':'true','fund.':'true','funk or funks stand. dict.':'true','g.':'true','gael.':'true','gaz.':'true','gen.':'true','gen.':'true','geogr.':'true','geol.':'true','geom.':'true','geomorphol.':'true','ger.':'true','gloss.':'true','gmc.':'true','godef.':'true','goth.':'true','govt.':'true','gr.':'true','gr.':'true','gram.':'true','gt.':'true','heb.':'true','hebr.':'true','her.':'true','herb.':'true','hind.':'true','hist.':'true','hist.':'true','histol.':'true','hort.':'true','househ.':'true','housek.':'true','ibid.':'true','icel.':'true','ichthyol.':'true','id.':'true','i.e.':'true','ie.':'true','illustr.':'true','imit.':'true','immunol.':'true','imp.':'true','impers.':'true','impf.':'true','ind.':'true','indef.':'true','industr.':'true','inf.':'true','infl.':'true','inorg.':'true','ins.':'true','inst.':'true','int.':'true','intr.':'true','introd.':'true','ir.':'true','irreg.':'true','it.':'true','j.':'true','(j.)':'true','(jam.)':'true','jap.':'true','joc.':'true','jrnl.':'true','jun.':'true','knowl.':'true','l.':'true','l.':'true','lang.':'true','lect.':'true','less.':'true','let.':'true','lett.':'true','lg.':'true','lit.':'true','lit.':'true','lith.':'true','lxx':'true','m.':'true','mag.':'true','magn.':'true','mal.':'true','man.':'true','managem.':'true','manch.':'true','manuf.':'true','mar.':'true','masc. (rarely m.)':'true','math.':'true','mdu.':'true','me.':'true','mech.':'true','med.':'true','med.l.':'true','mem.':'true','mataph.':'true','meteorol.':'true','mhg.':'true','midl.':'true','mil.':'true','min.':'true','mineral.':'true','mlg.':'true','mics.':'true','mod.':'true','mod.l.':'true','(morris)':'true','mus.':'true','myst.':'true','mythol.':'true','n.':'true','n.':'true','n.amer.':'true','n.&amp;q.':'true','narr.':'true','nat.':'true','nat. hist.':'true','naut.':'true','n.e.':'true','n.e.d.':'true','dictionary (first edition)neurol.':'true','neut. (rarely n.)':'true','nf.':'true','nfr.':'true','no.':'true','nom.':'true','north.':'true','norw.':'true','n.q.':'true','n.t.':'true','nucl.':'true','numism.':'true','n.w.':'true','n.z.':'true','obj.':'true','obl.':'true','obs.':'true','obs.':'true','obstetr.':'true','occas.':'true','oe.':'true','of.':'true','ofr.':'true','ofris.':'true','ohg.':'true','oir.':'true','on.':'true','onf.':'true','ophthalm.':'true','opp.':'true','opt.':'true','org.':'true','orig.':'true','ornith.':'true','os.':'true','osl.':'true','o.t.':'true','outl.':'true','oxf.':'true','p.':'true','palaeogr.':'true','palaeont. in palaeontology; (in titles) palaeontology':'true','-icalpa. pple.':'true','(partridge)':'true','unconventional englishpass.':'true','pa.t.':'true','path.':'true','perh. perhapspers.':'true','pers.':'true','petrogr.':'true','petrol.':'true','(pettman)':'true','pf.':'true','pg.':'true','pharm.':'true','philol.':'true','philos.':'true','phonet.':'true','photogr.':'true','phr.':'true','phys.':'true','physiol.':'true','pict.':'true','pl.':'true','plur.':'true','poet.':'true','pol.':'true','pol.':'true','pol. econ.':'true','polit.':'true','pop.':'true','porc.':'true','poss.':'true','pott.':'true','ppl. a.':'true','pple. adj.':'true','pple.':'true','pr.':'true','pr.':'true','pract.':'true','prec.':'true','pred.':'true','pref.':'true','pref.':'true','pref.':'true','prep.':'true','pres.':'true','princ.':'true','priv.':'true','prob.':'true','probl.':'true','proc.':'true','pron.':'true','pronunc.':'true','prop.':'true','pros.':'true','prov.':'true','pr. pple.':'true','psych.':'true','psychol.':'true','publ.':'true','q.':'true','quot(s).':'true','q.v.':'true','r.':'true','radiol.':'true','r.c.ch.':'true','rec.':'true','redupl.':'true','ref.':'true','refash.':'true','refl.':'true','reg.':'true','reg.':'true','rel':'true','reminisc.':'true','rep.':'true','repr.':'true','res.':'true','rev.':'true','rev.':'true','rhet.':'true','rom.':'true','rum.':'true','russ.':'true','s.':'true','s.afr.':'true','sb.':'true','sc.':'true','sc.':'true','scot.':'true','scand.':'true','sch.':'true','sc. nat. dict.':'true','scotl.':'true','sel.':'true','ser.':'true','sing.':'true','sk.':'true','skr.':'true','slav.':'true','s.n.d.':'true','soc.':'true','sociol.':'true','sp.':'true','sp.':'true','sp.':'true','spec.':'true','spec.':'true','st.':'true','stand.':'true','stanf.':'true','str.':'true','struct.':'true','stud.':'true','subj.':'true','subord. cl.':'true','subseq.':'true','subst.':'true','suff.':'true','superl.':'true','suppl.':'true','surg.':'true','s.v.':'true','sw.':'true','s.w.':'true','syd. soc. lex.':'true','syll.':'true','syr.':'true','syst.':'true','taxon.':'true','techn.':'true','technol.':'true','telegr.':'true','teleph.':'true','(th.)':'true','theatr.':'true','theol.':'true','theoret.':'true','tokh.':'true','tr.':'true','transl.':'true','trans.':'true','trans.':'true','transf.':'true','trav.':'true','treas.':'true','treat.':'true','treatm.':'true','trig.':'true','trop.':'true','turk.':'true','typog.':'true','typogr.':'true','ult.':'true','univ.':'true','unkn.':'true','u.s.':'true','u.s.s.r.':'true','usu.':'true','v.':'true','vb.':'true','var(r).':'true','vars.':'true','vbl. sb.':'true','vertebr.':'true','vet.':'true','vet. sci.':'true','viz.':'true','voy.':'true','v.str.':'true','vulg.':'true','v.w.':'true','w.':'true','wd.':'true','webster':'true','westm.':'true','wgmc.':'true','wks.':'true','w.midl.':'true','ws.':'true','(y.)':'true','yrs.':'true','zoogeogr.':'true','zool.':'true' };
	
	this.foundTokens = [];
}

Tokenizer.prototype = {
	parseLine: function(line) {

		for(var i = 0; i < line.length; i++) {
			var j, foundToken = false;
			
			for(j = line.length; j > i; j--) {
				var subVal = line.substring(i, j);

				if(this.abbrevObj[subVal.toLowerCase()] != undefined) {
					this.foundTokens.push(subVal);
					foundToken = true;
					break;
				}
				
				for(var k = 0; k < this.regexTokens.length; k++) {
					if(subVal.match(this.regexTokens[k])) {
						
						this.foundTokens.push(subVal);
						foundToken = true;
						break;
					}
				}

				if(foundToken == true) {
					break;
				}
			}

			if(foundToken == true) {
				
				i = j-1;
			}
		}
	},

	getFoundTokens: function() {
		return this.foundTokens;
	}
};

module.exports = Tokenizer;