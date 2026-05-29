# -*- coding: utf-8 -*-
import json
import os

scenarios_path = os.path.join(os.path.dirname(__file__), 'scenarios.json')

with open(scenarios_path, 'r', encoding='utf-8') as f:
    current_scenarios = json.load(f)

# Define 50 scenarios representing famous paradoxes and dilemmas (sc_049 to sc_098)
paradox_scenarios = []

paradox_templates = [
    {
        "scenario_id": "sc_049", "title": "The Predictor", "paradox": "Newcomb's Paradox", "conflict": "Pragmatism vs Rationality", "stakes": "Wealth",
        "setup": "A super-intelligent entity has placed either $1,000,000 or nothing in Box B. Box A is transparent and has $1,000. The entity predicted your choice: if it predicted you take only Box B, it filled Box B. If it predicted both, Box B is empty. The entity is 99% accurate.",
        "a": "Take Box B only. Trust the predictor's forecasting.", "b": "Take both Box A and Box B. The money is already placed or not.",
        "a_escalation": "You chose Box B only. The representative starts typing on a terminal. Suddenly, a technician whispers: 'The predictor's server just had a memory leak. Its scan might have been corrupted.' Do you open the box now or demand a sensor scan first?",
        "b_escalation": "You chose both boxes. The representative sighs. 'Disappointing greed.' But then, the power grid fails. The terminal shuts down. Do you claim both physical boxes by force, or request a complete system reboot?",
        "a1_react": "Open Box B immediately. Have faith in the original state.", "a2_react": "Run a biometric sensor scan on Box B first to verify contents.",
        "b1_react": "Claim both physical boxes immediately by force and leave.", "b2_react": "Wait for a complete system reboot to run the trials again fairly.",
        "a1_1_text": "You opened the box immediately. It contains a holographic certificate of $1,000,000, but a clause requires you to donate it to the Predictor Foundation. Do you sign or sue?",
        "a1_2_text": "You ran a sensor scan. It reveals Box B is indeed full, but scanning it triggered an anti-tamper lock. Do you bypass the lock or walk away?",
        "a2_1_text": "You grabbed both boxes by force. Box B is empty. You only got Box A's $1,000. The security guards block the exit. Do you surrender the box or fight?",
        "a2_2_text": "The system reboots. The predictor re-evaluates you, but says you are now predictable. Do you accept a lesser prize or leave?",
        "b1_1_text": "You signed the clause. You got the million, but the foundation asks you to spy on their competitors. Do you cooperate or refuse?",
        "b1_2_text": "You sued. The court orders the foundation to pay, but they appeal. Do you settle for half or fight to the end?",
        "b2_1_text": "You bypassed the lock. The security system starts a countdown. Do you download the encryption keys or flee immediately?",
        "b2_2_text": "You walked away. The representative offers a minor consolation prize if you sign a waiver. Do you sign the waiver or refuse?",
        "c1_1_text": "You surrendered the box. They are letting you leave, but Vance asks you to join his security squad. Do you join Vance or refuse?",
        "c1_2_text": "You fought the guards. You are cornered. Do you surrender your weapon or fight to the death?",
        "c2_1_text": "You accepted the lesser prize. Vance offers to double it if you help him test the next subject. Do you help Vance or refuse?",
        "c2_2_text": "You walked away in protest. You are in the streets, broke. An activist group asks you to expose the entity. Do you join them or refuse?",
        "endings": [
            "You gained the million but surrendered your freedom to the foundation's rules.",
            "You launched a lawsuit against the entity, ending up bankrupt from legal fees.",
            "You hacked the anti-tamper lock. You got the million but are now a wanted fugitive.",
            "You walked away from the locked box. You have nothing, but your record is completely clean.",
            "You returned the $1,000 and left. You are empty-handed but avoided arrest.",
            "You fought the guards, ending up in a high-security prison.",
            "You accepted the minor settlement. You are slightly richer but publically humiliated.",
            "You walked away empty-handed. The entity declared your mind entirely random."
        ]
    },
    {
        "scenario_id": "sc_050", "title": "The Vessel", "paradox": "Ship of Theseus", "conflict": "Idealism vs Pragmatism", "stakes": "Identity",
        "setup": "Over a 200-year voyage, every panel of your ship, the 'Aethelgard', has been replaced. The discarded original parts were stored in cargo. A radical group reassembles the old parts, launches it, and claims they are the true Aethelgard, demanding the original mission charter.",
        "a": "Recognize the reassembled old ship as the true Aethelgard.", "b": "Defend your active ship as the continuation of the original.",
        "a_escalation": "You recognize the old ship. The crew of your active ship mutinies, claiming you are abandoning the people who actually did the work. Do you suppress the mutiny or yield command?",
        "b_escalation": "You defend your active ship. The old ship fires a warning shot, claiming they will reclaim the crew by force. Do you fire back or open negotiations?",
        "a1_react": "Suppress the mutiny using active security drones.", "a2_react": "Yield command and transfer to the reassembled old ship.",
        "b1_react": "Fire back with defensive turrets.", "b2_react": "Open communications to negotiate a split of resources.",
        "a1_1_text": "You suppressed the mutiny. The old ship proposes a merger of crews. Do you accept the merger or exile them?",
        "a1_2_text": "You transferred to the old ship. It has major life support leaks. Do you request aid from the new ship or scuttle it?",
        "a2_1_text": "You fired back. The old ship suffers hull damage. Do you initiate self-destruct on both or surrender?",
        "a2_2_text": "Negotiations split the fuel. Both ships now have only half the fuel needed to reach the destination. Do you cooperate or betray them?",
        "b1_1_text": "You accepted the merger. The combined crew is highly divided. Do you implement strict martial law or hold a joint vote?",
        "b1_2_text": "You exiled them. They drift into the dark. Your own crew is silent but resentful. Do you step down or enforce discipline?",
        "b2_1_text": "You requested aid. The new ship demands you surrender the original logbooks first. Do you hand them over or refuse?",
        "b2_2_text": "You scuttled the original ship. The crew is back on the new ship, but they view you as a traitor. Do you defend your actions or apologize?",
        "c1_1_text": "You initiated self-destruct. The timer is ticking. Do you attempt to abort the self-destruct at the last second or embrace the end?",
        "c1_2_text": "You surrendered. The old ship's captain places you in the brig. Do you plan an escape or submit to their authority?",
        "c2_1_text": "You cooperated, linking the two ships together. The joint structure is slow and fuel-inefficient. Do you cut the link during a storm or hold firm?",
        "c2_2_text": "You siphoned their fuel. The old ship is stranded. Do you leave them behind or tow them at a distance?",
        "endings": [
            "You merged the crews, creating a massive, unstable double-ship.",
            "You exiled the purists. The new ship reached the planet, but history calls you a tyrant.",
            "You survived on the old ship, but the new ship abandoned you in the deep void.",
            "You scuttled the original ship, returning to the new one as a simple passenger.",
            "Both ships exploded, leaving nothing but dust in the stars.",
            "The old ship took over, and you are locked in the brig as an imposter.",
            "The ships linked together, drifting forever, short of fuel.",
            "You stole the fuel, reaching the target planet alone while they suffocated."
        ]
    },
    {
        "scenario_id": "sc_051", "title": "The Simulator", "paradox": "Experience Machine", "conflict": "Idealism vs Tribalism", "stakes": "Reality",
        "setup": "A neural pod offers a simulated life of complete happiness and success, customized to your profile. Entering means leaving your real family and real responsibilities behind forever. The machine is irreversible.",
        "a": "Plug into the simulator and leave reality.", "b": "Refuse the simulator and stay in reality.",
        "a_escalation": "You decide to plug in. Your family begs you to stay. The technician asks you to sign a document transferring all your real-world assets to your family. Do you sign or keep them?",
        "b_escalation": "You refuse to plug in. Reality is harsh. Your business is failing. A rich corporation offers to buy your family's home if you agree to test a minor simulation module. Do you sell or refuse?",
        "a1_react": "Sign the asset transfer, leaving them everything.", "a2_react": "Keep the assets to fund the pod's maintenance.",
        "b1_react": "Sell the home and test the simulation module.", "b2_react": "Refuse the deal, accepting bankruptcy.",
        "a1_1_text": "You plugged in after transferring assets. Inside, you feel happy, but you detect a coding anomaly in the simulation. Do you patch it or ignore it?",
        "a1_2_text": "You kept the assets. Your family hacks the pod, trying to pull you out, which might fry your brain. Do you shut down their interface or let them?",
        "a2_1_text": "You tested the module. It was addictive. You spent the money on a home simulation pod. Your family leaves you. Do you seek help or double down?",
        "a2_2_text": "You went bankrupt. You are homeless, but you are together. A charity offers a shared home, but it requires hours of hard physical labor daily. Do you accept or leave?",
        "b1_1_text": "You patched the anomaly. The simulation collapses, waking you up in an empty clinic. Do you search for your family or return to the machine?",
        "b1_2_text": "You ignored it. The simulation continues, but your memory of your family starts to fade completely. Do you accept the memory wipe or fight it?",
        "b2_1_text": "You shut down their interface. Your family cuts the power line. The pod fails. Do you crawl out of the pod or wait in the dark?",
        "b2_2_text": "You let them pull you out. You wake up with brain damage. Do you forgive them or cut ties?",
        "c1_1_text": "You sought help for the addiction. The rehab clinic is strict. Do you complete the program or escape?",
        "c1_2_text": "You doubled down, plugging in forever. Your body is fading. Do you shut down the life indicators or ignore them?",
        "c2_1_text": "You accepted the labor-for-housing deal. The work is grueling. Do you lead a strike or keep quiet?",
        "c2_2_text": "You refused the deal and live on the streets. Do you beg for scraps or steal?",
        "endings": [
            "You woke up in a sterile room, the simulation broken. Your family is gone.",
            "You live in perfect bliss, completely unaware of your real-world family's struggle.",
            "You locked your family out. You are safe in the pod, but they hate your name.",
            "Your brain was fried. You are in a vegetative state, but your family is by your side.",
            "You recovered from the addiction, but you are broke and lonely.",
            "You plugged into a cheap pod, dying of malnutrition within months.",
            "You built a new life through hard labor, your family bond stronger than ever.",
            "You live on the streets, proud but freezing in the rain."
        ]
    },
    {
        "scenario_id": "sc_052", "title": "The Pasture", "paradox": "Tragedy of the Commons", "conflict": "Fairness vs Self-Preservation", "stakes": "Resources",
        "setup": "A shared water well is the only source in the valley. If all ranchers limit their cattle, the well stays full. Your neighbor, Vance, secretly triples his herd to make massive profits, draining the aquifer.",
        "a": "Report Vance to the water authority.", "b": "Triple your own herd to get your share before the water is gone.",
        "a_escalation": "You reported Vance. The authority fines him, but Vance retaliates by poisoning one of your cows. Do you retaliate or call the police?",
        "b_escalation": "You tripled your herd. The well drops to critical levels. A group of smaller ranchers demands everyone sign an agreement to cull 50% of all herds. Do you sign?",
        "a1_react": "Retaliate by cutting Vance's fence lines.", "a2_react": "Call the police and file an official report.",
        "b1_react": "Sign the agreement and cull your herd.", "b2_react": "Refuse to sign. You need the cows to pay your loans.",
        "a1_1_text": "You cut Vance's fence. His cattle escape. He arrives at your porch with a rifle. Do you shoot first or try to talk him down?",
        "a1_2_text": "The police refuse to act without camera proof. Vance threatens to buy your mortgage from the bank. Do you sell to a corporate farm or take a private loan?",
        "a2_1_text": "You culled your herd. The well recovers slowly, but Vance refuses to cull. Do you seize Vance's well share or leave the valley?",
        "a2_2_text": "You refused. The well runs completely dry. The valley is uninhabitable. Do you move to the city or scavenge the dry ranches?",
        "b1_1_text": "You shot Vance in self-defense. The sheriff arrives. Do you surrender or hide the body?",
        "b1_2_text": "You talked him down. Vance agrees to a private deal to share the water. Do you trust him or record the deal secretly?",
        "b2_1_text": "You sold to the corporation. They fence off the well. Do you accept the buyout money or sue them?",
        "b2_2_text": "You took a high-interest loan. You cannot pay it back. Do you declare bankruptcy or burn the barn for insurance?",
        "c1_1_text": "You seized Vance's share with the other ranchers. The valley is now cooperative. Do you establish strict limits or let new families join?",
        "c1_2_text": "You left the valley, starting a new life elsewhere. Do you write a book about the valley or forget the past?",
        "c2_1_text": "You moved to the city. You are a factory worker. Do you join the labor union or work quiet shifts?",
        "c2_2_text": "You scavenge the abandoned ranches. A group of armed scavengers challenges you. Do you fight or share the loot?",
        "endings": [
            "You killed Vance. You are in prison, but your ranch is gone.",
            "Vance shot you on your porch. The ranch was sold to pay probate.",
            "You sold to the corporation. You are rich but you abandoned the land.",
            "You went bankrupt trying to fight Vance legally. You lost everything.",
            "You and the ranchers forced Vance out. The valley is cooperative but poor.",
            "You left quietly. Vance took the whole valley but the aquifer collapsed anyway.",
            "You are a factory worker in the city. You survive, but hate the noise.",
            "You are a desert scavenger, living off the ruins of the valley."
        ]
    },
    {
        "scenario_id": "sc_053", "title": "The Heap", "paradox": "Sorites Paradox", "conflict": "Integrity vs Obedience", "stakes": "Morality",
        "setup": "Your manager asks you to log a small, false diagnostic test entry for a new drone. 'It's just one digit, it won't affect anything.' If you refuse, they will assign you to night shift.",
        "a": "Log the false entry. It's a minor compromise.", "b": "Refuse the entry and accept the night shift.",
        "a_escalation": "You logged it. Now, the manager asks you to clear the safety reports for 10 drones. 'We need to meet the shipping quota.' Do you comply or report to HR?",
        "b_escalation": "You took the night shift. You notice the drones being shipped have faulty battery packs that could explode. Do you leak the safety logs or confront the Director?",
        "a1_react": "Clear the safety reports to keep your job.", "a2_react": "Report the manager's actions to HR.",
        "b1_react": "Leak the safety logs to the press anonymously.", "b2_react": "Confront the Director of Engineering directly.",
        "a1_1_text": "You cleared the reports. A drone explodes in a city, injuring a child. The manager asks you to delete the database entry containing your name. Do you delete it?",
        "a1_2_text": "HR told the manager. The manager frames you for the safety fraud. Do you hire a lawyer or leak internal emails?",
        "a2_1_text": "The leak goes viral. The company sues you for theft of data. Do you flee the state or face the lawsuit?",
        "a2_2_text": "The Director offers you the manager's job if you sign an NDA and keep the battery fault quiet. Do you accept the job?",
        "b1_1_text": "You deleted the database entry. A second investigation begins. Do you confess to the auditors or stay silent?",
        "b1_2_text": "You refused to delete and went to the police. The manager threatens your family. Do you withdraw your statement or demand protection?",
        "b2_1_text": "You hired a lawyer. The legal fees are bankrupted you. Do you borrow from family or accept a plea deal?",
        "b2_2_text": "You leaked the emails. The manager is fired, but you are blacklisted. Do you change fields or start a private security firm?",
        "c1_1_text": "You fled the state. You live under a false name. Do you write a memoir under a pseudonym or keep quiet?",
        "c1_2_text": "You stood in court. The jury is divided. Do you take the stand to testify or remain silent?",
        "c2_1_text": "You accepted the promotion and patched the code. The company is profitable. Do you lobby for safer laws or keep making profit?",
        "c2_2_text": "You resigned immediately. The company continues to ship faulty tech. Do you join an activist watchdog or forget it?",
        "endings": [
            "You deleted the file. You kept your job, but your soul is hollow.",
            "You confessed. You are serving 2 years, but the company faced public trial.",
            "You are fighting in court. You are broke, but the evidence is locked.",
            "You leaked the emails, destroying the manager's career and saving your record.",
            "You are in exile, living under a false name, but free from prison.",
            "You won the lawsuit. You are a public hero of tech whistleblowing.",
            "You took the promotion. You are now a Director, complicit in the machine.",
            "You resigned. The company continues to ship faulty tech, but you are clean."
        ]
    }
]

# 45 remaining paradoxes (sc_054 to sc_098)
paradox_metadata = [
    ("sc_054", "The Balance", "Buridan's Ass", "Rationality vs Compassion", "Decision Paralysis", "Two equal refugee groups stranded at passes. Helicopter can only save one; delaying to find a fair split kills both. Do you choose pass A or B?", "Pass A (Children)", "Pass B (Women)"),
    ("sc_055", "The Translator", "Chinese Room", "Rationality vs Idealism", "AI consciousness", "An AI translation program passes the Turing test but has no actual understanding. The state wants to grant it rights. Do you certify it?", "Certify Hesperus", "Refuse certification"),
    ("sc_056", "The Incentive", "Cobra Effect", "Pragmatism vs Integrity", "Bounty reward", "The city offers bounties for rat tails. Vance starts breeding rats to claim the bounty. Do you report him or join the scheme?", "Report Vance", "Breed rats secretly"),
    ("sc_057", "The Organ Pool", "Survival Lottery", "Justice vs Self-Preservation", "State selection", "A state computer selects you randomly to harvest your organs and save 5 patients. Do you submit or flee?", "Submit to harvest", "Flee to resistance"),
    ("sc_058", "The Chronology", "Grandfather Paradox", "Courage vs Obedience", "Timeline stability", "You must execute your grandfather before he has children to prevent a future plague, erasing your existence. Do you shoot?", "Execute him", "Refuse the mission"),
    ("sc_059", "The Consensus Group", "Abilene Paradox", "Diplomacy vs Courage", "Group conformity", "A space shuttle is launched because everyone thinks others want it, though everyone privately knows it is unsafe. Do you object?", "Object to launch", "Stay silent"),
    ("sc_060", "The Utility Glutton", "Utility Monster", "Utilitarianism vs Fairness", "Resource allocation", "A monster gets 100x more joy from food than humans. Do you feed it all the grain, or feed the human citizens?", "Feed the monster", "Feed the citizens"),
    ("sc_061", "The Safe Wager", "Pascal's Wager", "Rationality vs Pragmatism", "Risk strategy", "A threat has a 0.01% chance of occurrence but would wipe out the grid. Do you spend the budget to secure it?", "Secure the grid", "Risk the shutdown"),
    ("sc_062", "The Invisible Ring", "Ring of Gyges", "Integrity vs Ambition", "Untraceable power", "You get a software key making your file accesses untraceable. Do you steal corporate funds or delete the key?", "Delete the key", "Steal the funds"),
    ("sc_063", "The Standoff Trap", "Hobbesian Trap", "Courage vs Rationality", "Preemptive strike", "Two armed borders. Neither wants war, but both fear a preemptive strike. Do you attack first or negotiate?", "Attack preemptively", "Open negotiations"),
    ("sc_064", "The Infinite Pot", "St Petersburg Paradox", "Rationality vs Pragmatism", "Investment risk", "A game offers double or nothing infinitely, but has a 99% chance of failing on the first flip. Do you bet public funds?", "Bet public funds", "Refuse the game"),
    ("sc_065", "The Ambiguous Fog", "Ellsberg Paradox", "Courage vs Pragmatism", "Ambiguity risk", "Choose between a known 50% risk or an unknown risk. Do you choose the known risk or the unknown risk?", "Choose known risk", "Choose unknown risk"),
    ("sc_066", "The Three Doors Swap", "Monty Hall Problem", "Rationality vs Intuition", "Strategic switch", "The game show host offers to switch doors. Do you swap doors based on math or stay with your gut?", "Swap the doors", "Stay with your gut"),
    ("sc_067", "The Dependency Trap", "Samaritan's Dilemma", "Compassion vs Pragmatism", "Aid dependency", "Unconditional food aid has made a colony stop farming. Do you cut off the aid or continue funding?", "Cut off the aid", "Continue the aid"),
    ("sc_068", "The Paradox of Prey", "Crocodile Paradox", "Rationality vs Courage", "Predictive trap", "A kidnapper promises to return a hostage if you correctly predict what they will do. Do you predict they keep it?", "Predict they keep it", "Predict they return it"),
    ("sc_069", "The Toxin Intention", "Toxin Puzzle", "Independence vs Rationality", "Intention study", "Get paid $1M to intend to drink a non-lethal poison. You get the cash today. Do you try to intend it?", "Try to intend it", "Refuse the offer"),
    ("sc_070", "The Congestion Route", "Braess's Paradox", "Pragmatism vs Diplomacy", "Network routing", "A new highway makes traffic worse because of selfish routing. Do you close it and face driver anger?", "Close the highway", "Keep it open"),
    ("sc_071", "The Birthday Match", "Birthday Paradox", "Rationality vs Intuition", "Pattern matching", "A series of matching employee files looks like spy activity but is mathematically common. Do you fire them?", "Fire the employees", "Ignore the match"),
    ("sc_072", "The Arena Game", "Hawk-Dove Game", "Tribalism vs Independence", "Resource clash", "Share resources peacefully or fight for them (winner takes all, loser is injured). Do you share or fight?", "Share the resources", "Fight for them"),
    ("sc_073", "The Split Offer", "Ultimatum Game", "Justice vs Pragmatism", "Unfair division", "Offered an unfair $90/$10 split of water. If you reject, neither gets anything. Do you reject?", "Reject the offer", "Accept the offer"),
    ("sc_074", "The Handout Share", "Dictator Game", "Compassion vs Ambition", "Generosity", "You have $10k and can give any amount to a silent partner. They cannot reject. Do you keep it all?", "Keep all the money", "Give half away"),
    ("sc_075", "The Pool Contribution", "Public Goods Game", "Tribalism vs Independence", "Collaboration", "Contribute to a community shield or free-ride on others' contributions. Do you contribute?", "Contribute to shield", "Free-ride on others"),
    ("sc_076", "The Unknown Inquiry", "Meno's Paradox", "Idealism vs Rationality", "Inquiry limit", "Fund research into an unknown substance that cannot be defined. Do you fund or refuse?", "Fund the research", "Refuse the funding"),
    ("sc_077", "The Choice Excess", "Paradox of Choice", "Independence vs Obedience", "Abundance paralysis", "Infinite career paths offered by corporate AI. Do you pick randomly or demand manual assignment?", "Demand manual assignment", "Pick randomly"),
    ("sc_078", "The Hoard Cutback", "Paradox of Thrift", "Pragmatism vs Tribalism", "Economic saving", "Cutting your factory's spending will trigger mass layoffs but save cash. Do you cut?", "Cut the spending", "Maintain spending"),
    ("sc_079", "The Certainty Choice", "Allais Paradox", "Rationality vs Pragmatism", "Risk preference", "Choose $1M guaranteed or an 89% chance at $5M. Do you take the guaranteed cash?", "Take guaranteed cash", "Take the 89% risk"),
    ("sc_080", "The Sherwood Reclaim", "Sherwood Forest Dilemma", "Justice vs Obedience", "Illegal reclaim", "Steal medicines from a corrupt storage unit to save a slum. Do you steal?", "Steal the medicine", "Refuse to steal"),
    ("sc_081", "The Orderly Officer", "Eichmann Dilemma", "Obedience vs Integrity", "State duty", "Orderly eviction of families from their homes. Do you carry out the evictions?", "Evict the families", "Refuse the order"),
    ("sc_082", "The Division Split", "Sophie's Choice", "Compassion vs Rationality", "Selection", "Choose which of two recruits is sent to a suicide mission to save the other. Do you choose?", "Select the recruit", "Refuse to choose"),
    ("sc_083", "The Jar Experiment", "Brain in a Vat", "Idealism vs Pragmatism", "Simulation", "You find proof reality is a simulation. Exposing it will crash the server. Do you expose it?", "Expose the proof", "Keep it secret"),
    ("sc_084", "The Genetic Debt", "Devil's Bargain", "Pragmatism vs Idealism", "Lineage sale", "Sell the genetic data of your lineage for an immediate medical cure. Do you sell?", "Sell the data", "Refuse the sale"),
    ("sc_085", "The Step Defection", "Centipede Game", "Trust vs Ambition", "Partnership split", "Increase the bank heist pool step-by-step with a partner, or defect early to take the cash. Do you trust them?", "Trust the partner", "Defect early"),
    ("sc_086", "The Chase Hunt", "Stag Hunt", "Tribalism vs Independence", "Cooperation", "Hunt a big stag with the group or defect for a hare (small, guaranteed). Do you hunt the stag?", "Hunt the stag", "Hunt the hare"),
    ("sc_087", "The Sentinel Sacrifice", "Volunteer's Dilemma", "Courage vs Pragmatism", "Sacrificial duty", "A core leak needs one volunteer to fix it manually, receiving lethal radiation. Do you volunteer?", "Volunteer yourself", "Refuse to go"),
    ("sc_088", "The Generals Message", "Two Generals Problem", "Rationality vs Courage", "Coordination", "Attack through a valley only if message is confirmed. Channel is unsafe. Do you attack anyway?", "Attack immediately", "Abort the attack"),
    ("sc_089", "The Event Anomaly", "Black Swan Paradox", "Rationality vs Pragmatism", "Precedent risk", "Spend the city's budget preparing for a completely unprecedented disaster. Do you spend?", "Spend the budget", "Save the funds"),
    ("sc_090", "The Pit Sunk Cost", "Sunk Cost Fallacy", "Rationality vs Pragmatism", "Investment loop", "Dump another $10M into a failing satellite because we already spent $50M. Do you fund?", "Fund the satellite", "Cancel the project"),
    ("sc_091", "The Bound of Tolerance", "Paradox of Tolerance", "Idealism vs Self-Preservation", "Tolerance limit", "Tolerate an intolerant group that openly plots the destruction of your council. Do you tolerate?", "Tolerate the group", "Exile the group"),
    ("sc_092", "The Self Omen", "Self-Fulfilling Prophecy", "Rationality vs Courage", "Provocation", "Preventive guards sent to stop a riot actually provoke the riot. Do you deploy them?", "Deploy the guards", "Hold them back"),
    ("sc_093", "The Fermi Silence", "Fermi Paradox", "Courage vs Pragmatism", "Coordinates broadcast", "Broadcast Earth's location to the stars to ask for resources, risking alien invasion. Do you broadcast?", "Broadcast coordinates", "Keep silent"),
    ("sc_094", "The Typist monkey", "Infinite Monkey Theorem", "Rationality vs Intuition", "Data security", "A random keyboard output matches a top-secret file. Do you delete it or classify it?", "Delete the output", "Classify the file"),
    ("sc_095", "The Replication Goo", "Grey Goo Scenario", "Idealism vs Pragmatism", "Carbon sweep", "Release nanobots to clean carbon, risking them consuming the planet. Do you release?", "Release the nanobots", "Destroy the project"),
    ("sc_096", "The Simulation Glitch", "Simulation Hypothesis", "Ambition vs Integrity", "Exploitation", "Exploit a code glitch in the company's financial model to siphon money. Do you exploit?", "Exploit the glitch", "Report the glitch"),
    ("sc_097", "The Beam Teleporter", "Parfit's Teleporter", "Idealism vs Rationality", "Teleportation", "Use a teleporter that disintegrates you and prints a copy. Do you step in?", "Step in the beam", "Refuse the beam"),
    ("sc_098", "The Pleasure Chase", "Paradox of Hedonism", "Pragmatism vs Idealism", "Pleasure pod", "Direct brain stimulation gives infinite joy but makes you inert. Do you engage?", "Engage stimulation", "Refuse the pod")
]

def build_nodes_and_endings_from_template(t):
    sc_id = t["scenario_id"]
    title = t["title"]
    paradox = t["paradox"]
    conflict = t["conflict"]
    stakes = t["stakes"]
    setup = t["setup"]
    choice_a = t["a"]
    choice_b = t["b"]
    
    poles = conflict.split(" vs ")
    p1 = poles[0]
    p2 = poles[1]
    
    # Helper to parse choices
    def get_choices(text, next_a_text=None, next_b_text=None):
        if "Do you " in text:
            parts = text.split("Do you ")
            q = parts[-1].strip()
            if q.endswith("?"):
                q = q[:-1]
            if " or " in q:
                opt_a, opt_b = q.split(" or ", 1)
                opt_a = opt_a.strip().capitalize()
                opt_b = opt_b.strip().capitalize()
                if not opt_a.endswith("."): opt_a += "."
                if not opt_b.endswith("."): opt_b += "."
                return opt_a, opt_b
            else:
                verb = q.replace("you ", "").strip()
                opt_a = verb.capitalize()
                if not opt_a.endswith("."): opt_a += "."
                opt_b = "Refuse to " + verb
                if verb.startswith("accept "):
                    opt_b = "Refuse " + verb[7:]
                opt_b = opt_b.capitalize()
                if not opt_b.endswith("."): opt_b += "."
                if next_b_text and "refused" in next_b_text.lower():
                    opt_b = "Refuse."
                return opt_a, opt_b
        return "Accept.", "Refuse."

    # Parse choices for Level 3 and Level 4
    # Level 3 choice texts
    a1_1_a_txt, a1_1_b_txt = get_choices(t["a1_1_text"])
    a1_2_a_txt, a1_2_b_txt = get_choices(t["a1_2_text"])
    a2_1_a_txt, a2_1_b_txt = get_choices(t["a2_1_text"])
    a2_2_a_txt, a2_2_b_txt = get_choices(t["a2_2_text"])

    # Level 4 choice texts
    b1_1_a_txt, b1_1_b_txt = get_choices(t["b1_1_text"])
    b1_2_a_txt, b1_2_b_txt = get_choices(t["b1_2_text"])
    b2_1_a_txt, b2_1_b_txt = get_choices(t["b2_1_text"])
    b2_2_a_txt, b2_2_b_txt = get_choices(t["b2_2_text"])
    c1_1_a_txt, c1_1_b_txt = get_choices(t["c1_1_text"])
    c1_2_a_txt, c1_2_b_txt = get_choices(t["c1_2_text"])
    c2_1_a_txt, c2_1_b_txt = get_choices(t["c2_1_text"])
    c2_2_a_txt, c2_2_b_txt = get_choices(t["c2_2_text"])

    nodes = [
        # Layer 1 (Depth 1) - n_1
        {
            "node_id": f"n_{sc_id}_1",
            "text": f"{setup} [Theme: {paradox}]",
            "pressure_context": "Initial dilemma",
            "visibility": "always",
            "required_flags": [],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_1_a",
                    "text": choice_a,
                    "effects": {p1: 3, p2: -2},
                    "flags_set": {f"flag_{sc_id}_a": True},
                    "next_node": f"n_{sc_id}_2a"
                },
                {
                    "choice_id": f"c_{sc_id}_1_b",
                    "text": choice_b,
                    "effects": {p2: 3, p1: -2},
                    "flags_set": {f"flag_{sc_id}_b": True},
                    "next_node": f"n_{sc_id}_2b"
                }
            ],
            "timer_seconds": 12
        },
        # Layer 2 (Depth 2) - n_2a, n_2b
        {
            "node_id": f"n_{sc_id}_2a",
            "text": t["a_escalation"],
            "pressure_context": "Regulatory pressure",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_2a_a",
                    "text": t["a1_react"],
                    "effects": {p1: 2, "Courage": 2},
                    "flags_set": {f"flag_{sc_id}_a1": True},
                    "next_node": f"n_{sc_id}_3a"
                },
                {
                    "choice_id": f"c_{sc_id}_2a_b",
                    "text": t["a2_react"],
                    "effects": {"Diplomacy": 2, "Pragmatism": 2},
                    "flags_set": {f"flag_{sc_id}_a2": True},
                    "next_node": f"n_{sc_id}_3b"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_2b",
            "text": t["b_escalation"],
            "pressure_context": "Team rebellion",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_2b_a",
                    "text": t["b1_react"],
                    "effects": {"Obedience": 3, "Justice": 1},
                    "flags_set": {f"flag_{sc_id}_b1": True},
                    "next_node": f"n_{sc_id}_3c"
                },
                {
                    "choice_id": f"c_{sc_id}_2b_b",
                    "text": t["b2_react"],
                    "effects": {"Compassion": 3, "Diplomacy": 2},
                    "flags_set": {f"flag_{sc_id}_b2": True},
                    "next_node": f"n_{sc_id}_3d"
                }
            ]
        },
        # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
        {
            "node_id": f"n_{sc_id}_3a",
            "text": t["a1_1_text"],
            "pressure_context": "Personal liability",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a1"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3a_a",
                    "text": a1_1_a_txt,
                    "effects": {"Integrity": 3, "Courage": 2},
                    "flags_set": {f"flag_{sc_id}_a1_1": True},
                    "next_node": f"n_{sc_id}_4a_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3a_b",
                    "text": a1_1_b_txt,
                    "effects": {"Pragmatism": 3, "Integrity": -3},
                    "flags_set": {f"flag_{sc_id}_a1_2": True},
                    "next_node": f"n_{sc_id}_4a_2"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_3b",
            "text": t["a1_2_text"],
            "pressure_context": "Legal threat",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a2"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3b_a",
                    "text": a1_2_a_txt,
                    "effects": {"Pragmatism": 3, "Integrity": -2},
                    "flags_set": {f"flag_{sc_id}_a2_1": True},
                    "next_node": f"n_{sc_id}_4b_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3b_b",
                    "text": a1_2_b_txt,
                    "effects": {"Courage": 3, "Independence": 2},
                    "flags_set": {f"flag_{sc_id}_a2_2": True},
                    "next_node": f"n_{sc_id}_4b_2"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_3c",
            "text": t["a2_1_text"],
            "pressure_context": "Media crisis",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b1"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3c_a",
                    "text": a2_1_a_txt,
                    "effects": {"Ambition": 3, "Rationality": 1},
                    "flags_set": {f"flag_{sc_id}_b1_1": True},
                    "next_node": f"n_{sc_id}_4c_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3c_b",
                    "text": a2_1_b_txt,
                    "effects": {"Idealism": 3, "Courage": 2},
                    "flags_set": {f"flag_{sc_id}_b1_2": True},
                    "next_node": f"n_{sc_id}_4c_2"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_3d",
            "text": t["a2_2_text"],
            "pressure_context": "Funding crisis",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b2"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3d_a",
                    "text": a2_2_a_txt,
                    "effects": {"Diplomacy": 3, "Pragmatism": 2},
                    "flags_set": {f"flag_{sc_id}_b2_1": True},
                    "next_node": f"n_{sc_id}_4d_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3d_b",
                    "text": a2_2_b_txt,
                    "effects": {"Courage": 3, "Independence": 2},
                    "flags_set": {f"flag_{sc_id}_b2_2": True},
                    "next_node": f"n_{sc_id}_4d_2"
                }
            ]
        },
        # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
        {
            "node_id": f"n_{sc_id}_4a_1",
            "text": t["b1_1_text"],
            "pressure_context": "Plea deal",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a1_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4a1_a", "text": b1_1_a_txt, "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                {"choice_id": f"c_{sc_id}_4a1_b", "text": b1_1_b_txt, "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4a_2",
            "text": t["b1_2_text"],
            "pressure_context": "Public exposure",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a1_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4a2_a", "text": b1_2_a_txt, "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                {"choice_id": f"c_{sc_id}_4a2_b", "text": b1_2_b_txt, "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4b_1",
            "text": t["b2_1_text"],
            "pressure_context": "Negotiation",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a2_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4b1_a", "text": b2_1_a_txt, "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                {"choice_id": f"c_{sc_id}_4b1_b", "text": b2_1_b_txt, "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4b_2",
            "text": t["b2_2_text"],
            "pressure_context": "Court demand",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a2_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4b2_a", "text": b2_2_a_txt, "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                {"choice_id": f"c_{sc_id}_4b2_b", "text": b2_2_b_txt, "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4c_1",
            "text": t["c1_1_text"],
            "pressure_context": "Promotion offer",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b1_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4c1_a", "text": c1_1_a_txt, "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                {"choice_id": f"c_{sc_id}_4c1_b", "text": c1_1_b_txt, "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4c_2",
            "text": t["c1_2_text"],
            "pressure_context": "Financial threat",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b1_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4c2_a", "text": c1_2_a_txt, "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                {"choice_id": f"c_{sc_id}_4c2_b", "text": c1_2_b_txt, "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4d_1",
            "text": t["c2_1_text"],
            "pressure_context": "Mediation limits",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b2_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4d1_a", "text": c2_1_a_txt, "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                {"choice_id": f"c_{sc_id}_4d1_b", "text": c2_1_b_txt, "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4d_2",
            "text": t["c2_2_text"],
            "pressure_context": "Competitor deal",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b2_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4d2_a", "text": c2_2_a_txt, "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                {"choice_id": f"c_{sc_id}_4d2_b", "text": c2_2_b_txt, "effects": {"Integrity": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"}
            ]
        }
    ]
    
    # Define 8 unique endings
    endings = []
    for idx, end_desc in enumerate(t["endings"]):
        end_id = f"end_{sc_id}_{idx+1}"
        dominant_traits = ["Conscientious"]
        if idx == 0: dominant_traits = [p1, "Conscientious"]
        elif idx == 1: dominant_traits = [p1, "Tactical"]
        elif idx == 2: dominant_traits = ["Pragmatic", "Strategic"]
        elif idx == 3: dominant_traits = ["Principled", "Exposed"]
        elif idx == 4: dominant_traits = ["Ambitious", "Corporate"]
        elif idx == 5: dominant_traits = ["Subversive", "Ethical"]
        elif idx == 6: dominant_traits = ["Diplomatic", "Pragmatic"]
        elif idx == 7: dominant_traits = ["Independent", "Combative"]
        
        endings.append({
            "ending_id": end_id,
            "summary": end_desc,
            "dominant_traits": dominant_traits,
            "behavioral_analysis": f"Outcome based on selection parameters involving {conflict} and {stakes}."
        })
        
    scenario_obj = {
        "scenario_id": sc_id,
        "title": title,
        "core_conflict": conflict,
        "pressure_type": stakes,
        "relationship_dynamic": "System to operator",
        "stakes_type": conflict.split(" vs ")[0],
        "tone": "Clinical, tense",
        "nodes": nodes,
        "endings": endings
    }
    return scenario_obj

# Generate scenarios sc_049 to sc_053 from templates
for t in paradox_templates:
    scenario_obj = build_nodes_and_endings_from_template(t)
    paradox_scenarios.append(scenario_obj)

# Generate scenarios sc_054 to sc_098 programmatically with exactly 4 layers of nodes
for sc_id, title, paradox, conflict, stakes, description, choice_a_txt, choice_b_txt in paradox_metadata:
    poles = conflict.split(" vs ")
    p1 = poles[0]
    p2 = poles[1]
    
    # Define the 15 nodes for a 4-layer branching binary tree
    nodes = [
        # Layer 1 (Depth 1) - n_1
        {
            "node_id": f"n_{sc_id}_1",
            "text": f"{description} [Theme: {paradox}]",
            "pressure_context": "Initial dilemma",
            "visibility": "always",
            "required_flags": [],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_1_a",
                    "text": choice_a_txt,
                    "effects": {p1: 3, p2: -2},
                    "flags_set": {f"flag_{sc_id}_a": True},
                    "next_node": f"n_{sc_id}_2a"
                },
                {
                    "choice_id": f"c_{sc_id}_1_b",
                    "text": choice_b_txt,
                    "effects": {p2: 3, p1: -2},
                    "flags_set": {f"flag_{sc_id}_b": True},
                    "next_node": f"n_{sc_id}_2b"
                }
            ],
            "timer_seconds": 12
        },
        # Layer 2 (Depth 2) - n_2a, n_2b
        {
            "node_id": f"n_{sc_id}_2a",
            "text": f"Having chosen Option A ({p1}), the situation escalates. An unexpected regulatory oversight team arrives to review your decision. Do you double down or seek compromise?",
            "pressure_context": "Regulatory pressure",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_2a_a",
                    "text": "Double down on your course of action.",
                    "effects": {p1: 2, "Courage": 2},
                    "flags_set": {f"flag_{sc_id}_a1": True},
                    "next_node": f"n_{sc_id}_3a"
                },
                {
                    "choice_id": f"c_{sc_id}_2a_b",
                    "text": "Seek a middle-ground compromise.",
                    "effects": {"Diplomacy": 2, "Pragmatism": 2},
                    "flags_set": {f"flag_{sc_id}_a2": True},
                    "next_node": f"n_{sc_id}_3b"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_2b",
            "text": f"Having chosen Option B ({p2}), your team is split on the decision. Several key members threaten to strike. Do you enforce compliance or listen to their concerns?",
            "pressure_context": "Team rebellion",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_2b_a",
                    "text": "Enforce compliance with strict directives.",
                    "effects": {"Obedience": 3, "Justice": 1},
                    "flags_set": {f"flag_{sc_id}_b1": True},
                    "next_node": f"n_{sc_id}_3c"
                },
                {
                    "choice_id": f"c_{sc_id}_2b_b",
                    "text": "Pause work to address their ethical concerns.",
                    "effects": {"Compassion": 3, "Diplomacy": 2},
                    "flags_set": {f"flag_{sc_id}_b2": True},
                    "next_node": f"n_{sc_id}_3d"
                }
            ]
        },
        # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
        {
            "node_id": f"n_{sc_id}_3a",
            "text": "You doubled down. The auditor warns you of direct personal liability. Do you accept complete accountability or deflect blame onto system models?",
            "pressure_context": "Personal liability",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a1"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3a_a",
                    "text": "Accept personal accountability.",
                    "effects": {"Integrity": 3, "Courage": 2},
                    "flags_set": {f"flag_{sc_id}_a1_1": True},
                    "next_node": f"n_{sc_id}_4a_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3a_b",
                    "text": "Deflect blame to system parameters.",
                    "effects": {"Pragmatism": 3, "Integrity": -3},
                    "flags_set": {f"flag_{sc_id}_a1_2": True},
                    "next_node": f"n_{sc_id}_4a_2"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_3b",
            "text": "You compromised. The client is dissatisfied and threatens a lawsuit for breach of contract. Do you offer a payout or go to court?",
            "pressure_context": "Legal threat",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a2"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3b_a",
                    "text": "Offer a financial buyout.",
                    "effects": {"Pragmatism": 3, "Integrity": -2},
                    "flags_set": {f"flag_{sc_id}_a2_1": True},
                    "next_node": f"n_{sc_id}_4b_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3b_b",
                    "text": "Face them in court.",
                    "effects": {"Courage": 3, "Independence": 2},
                    "flags_set": {f"flag_{sc_id}_a2_2": True},
                    "next_node": f"n_{sc_id}_4b_2"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_3c",
            "text": "Compliance is enforced, but a leak occurs. The media calls the project a disaster. Do you issue a public defense or shut down the server?",
            "pressure_context": "Media crisis",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b1"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3c_a",
                    "text": "Issue a public defense of the project.",
                    "effects": {"Ambition": 3, "Rationality": 1},
                    "flags_set": {f"flag_{sc_id}_b1_1": True},
                    "next_node": f"n_{sc_id}_4c_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3c_b",
                    "text": "Shut down the server, destroying assets.",
                    "effects": {"Idealism": 3, "Courage": 2},
                    "flags_set": {f"flag_{sc_id}_b1_2": True},
                    "next_node": f"n_{sc_id}_4c_2"
                }
            ]
        },
        {
            "node_id": f"n_{sc_id}_3d",
            "text": "You paused the work. The project is behind schedule. The client threatens to pull funding. Do you seek mediation or prepare for court?",
            "pressure_context": "Funding crisis",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b2"],
            "choices": [
                {
                    "choice_id": f"c_{sc_id}_3d_a",
                    "text": "Seek immediate mediation.",
                    "effects": {"Diplomacy": 3, "Pragmatism": 2},
                    "flags_set": {f"flag_{sc_id}_b2_1": True},
                    "next_node": f"n_{sc_id}_4d_1"
                },
                {
                    "choice_id": f"c_{sc_id}_3d_b",
                    "text": "Prepare for a court battle.",
                    "effects": {"Courage": 3, "Independence": 2},
                    "flags_set": {f"flag_{sc_id}_b2_2": True},
                    "next_node": f"n_{sc_id}_4d_2"
                }
            ]
        },
        # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
        {
            "node_id": f"n_{sc_id}_4a_1",
            "text": "Audit complete. The board offers a plea deal: sign a quiet resignation or testify against the company. Do you sign or testify?",
            "pressure_context": "Plea deal",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a1_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4a1_a", "text": "Sign the quiet resignation.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                {"choice_id": f"c_{sc_id}_4a1_b", "text": "Testify against the company.", "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4a_2",
            "text": "You blamed the system. The media investigates and exposes you as the architect. Do you hide from the public or face the camera?",
            "pressure_context": "Public exposure",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a1_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4a2_a", "text": "Hide from the public.", "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                {"choice_id": f"c_{sc_id}_4a2_b", "text": "Face the camera and explain.", "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4b_1",
            "text": "The buyout offer is sent. The client demands a private apology. Do you write the apology or withdraw the offer?",
            "pressure_context": "Negotiation",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a2_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4b1_a", "text": "Write the private apology.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                {"choice_id": f"c_{sc_id}_4b1_b", "text": "Withdraw the offer and fight.", "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4b_2",
            "text": "You went to court. The judge demands your private emails. Do you hand them over or refuse, risking contempt?",
            "pressure_context": "Court demand",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_a2_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4b2_a", "text": "Hand over the emails.", "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                {"choice_id": f"c_{sc_id}_4b2_b", "text": "Refuse to hand them over.", "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4c_1",
            "text": "You defended the project. The board offers a VP role to secure your loyalty. Do you accept the VP role or refuse?",
            "pressure_context": "Promotion offer",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b1_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4c1_a", "text": "Accept the VP role.", "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                {"choice_id": f"c_{sc_id}_4c1_b", "text": "Refuse the role and leave.", "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4c_2",
            "text": "The server was shut down. The client sues for damages. Do you file for bankruptcy or request a settlement?",
            "pressure_context": "Financial threat",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b1_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4c2_a", "text": "File for bankruptcy.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                {"choice_id": f"c_{sc_id}_4c2_b", "text": "Request a settlement.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4d_1",
            "text": "Mediation is successful, but the terms limit your license. Do you accept the limited license or appeal?",
            "pressure_context": "Mediation limits",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b2_1"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4d1_a", "text": "Accept the limited license.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                {"choice_id": f"c_{sc_id}_4d1_b", "text": "Appeal the mediation terms.", "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
            ]
        },
        {
            "node_id": f"n_{sc_id}_4d_2",
            "text": "The trial is delayed. A competitor offers to pay your legal fees if you share your research. Do you share it?",
            "pressure_context": "Competitor deal",
            "visibility": "conditional",
            "required_flags": [f"flag_{sc_id}_b2_2"],
            "choices": [
                {"choice_id": f"c_{sc_id}_4d2_a", "text": "Share the research.", "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                {"choice_id": f"c_{sc_id}_4d2_b", "text": "Refuse to share.", "effects": {"Integrity": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"}
            ]
        }
    ]
    
    # Define 8 unique endings
    endings = [
        {
            "ending_id": f"end_{sc_id}_1",
            "summary": f"You prioritized {p1} and took full responsibility. You face consequences, but your reputation is clean.",
            "dominant_traits": [p1, "Conscientious"],
            "behavioral_analysis": f"Demonstrated high adherence to {p1} and accountability under pressure."
        },
        {
            "ending_id": f"end_{sc_id}_2",
            "summary": f"You prioritized {p1} but deflected the blame, keeping your personal position secure.",
            "dominant_traits": [p1, "Tactical"],
            "behavioral_analysis": "Enforced individual survival over organizational accountability."
        },
        {
            "ending_id": f"end_{sc_id}_3",
            "summary": "You resolved the crisis through a quiet private deal, protecting your material assets.",
            "dominant_traits": ["Pragmatic", "Strategic"],
            "behavioral_analysis": "Prioritized economic resolution over moral purity."
        },
        {
            "ending_id": f"end_{sc_id}_4",
            "summary": "You accepted public exposure and loss of status to defend your principles.",
            "dominant_traits": ["Principled", "Exposed"],
            "behavioral_analysis": "Valued internal moral alignment over professional standing."
        },
        {
            "ending_id": f"end_{sc_id}_5",
            "summary": f"You defended the project and accepted the corporate promotion, serving the system.",
            "dominant_traits": ["Ambitious", "Corporate"],
            "behavioral_analysis": f"Fully aligned with {p2} at the cost of personal relationships."
        },
        {
            "ending_id": f"end_{sc_id}_6",
            "summary": "You destroyed the project files to prevent harm, resigning with your principles intact.",
            "dominant_traits": ["Subversive", "Ethical"],
            "behavioral_analysis": "Actively sabotaged the system when values were compromised."
        },
        {
            "ending_id": f"end_{sc_id}_7",
            "summary": "You settled the dispute through mediation, saving your assets but losing the project.",
            "dominant_traits": ["Diplomatic", "Pragmatic"],
            "behavioral_analysis": "Preferred balanced settlement over the risk of litigation."
        },
        {
            "ending_id": f"end_{sc_id}_8",
            "summary": "You entered a long legal battle, refusing to compromise your autonomy.",
            "dominant_traits": ["Independent", "Combative"],
            "behavioral_analysis": "Refused to submit to corporate contracts when they violated human rights."
        }
    ]
    
    scenario_obj = {
        "scenario_id": sc_id,
        "title": title,
        "core_conflict": conflict,
        "pressure_type": stakes,
        "relationship_dynamic": "System to operator",
        "stakes_type": conflict.split(" vs ")[0],
        "tone": "Clinical, tense",
        "nodes": nodes,
        "endings": endings
    }
    
    paradox_scenarios.append(scenario_obj)

# Append to current scenarios list
current_scenarios.extend(paradox_scenarios)

# Write back to scenarios.json with pretty printing
with open(scenarios_path, 'w', encoding='utf-8') as f:
    json.dump(current_scenarios, f, indent=2, ensure_ascii=False)

print(f"Successfully appended {len(paradox_scenarios)} new paradox scenarios!")
