# -*- coding: utf-8 -*-
import json
import os

scenarios_path = os.path.join(os.path.dirname(__file__), 'scenarios.json')

with open(scenarios_path, 'r', encoding='utf-8') as f:
    raw_scenarios = json.load(f)

# Make the generation idempotent by filtering out sc_049 to sc_098 before appending
current_scenarios = []
for s in raw_scenarios:
    parts = s['scenario_id'].split('_')
    if len(parts) >= 2 and parts[0] == 'sc':
        try:
            num = int(parts[1])
            if num < 49:
                current_scenarios.append(s)
        except ValueError:
            current_scenarios.append(s)
    else:
        current_scenarios.append(s)

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
            "text": setup,
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

def format_choice_text(txt):
    if not txt:
        return ""
    txt = txt.rstrip(".")
    words = txt.split()
    if len(words) > 0:
        first_word = words[0]
        proper_nouns = {"Vance", "Hesperus", "Box", "Pass", "HR", "Earth", "Aethelgard", "Predictor"}
        if first_word in proper_nouns:
            return txt
        if len(first_word) > 1 and first_word[0].isupper() and first_word[1].islower():
            words[0] = first_word[0].lower() + first_word[1:]
    return " ".join(words)

# Generate scenarios sc_054 to sc_098 programmatically with exactly 4 layers of nodes
for sc_id, title, paradox, conflict, stakes, description, choice_a_txt, choice_b_txt in paradox_metadata:
    poles = conflict.split(" vs ")
    p1 = poles[0]
    p2 = poles[1]
    
    fmt_a = format_choice_text(choice_a_txt)
    fmt_b = format_choice_text(choice_b_txt)
    
    # Determine the theme of the scenario
    tech_ids = {"sc_055", "sc_062", "sc_070", "sc_071", "sc_083", "sc_084", "sc_088", "sc_094", "sc_095", "sc_096", "sc_097"}
    temporal_ids = {"sc_058", "sc_093"}
    economic_ids = {"sc_056", "sc_064", "sc_065", "sc_067", "sc_073", "sc_074", "sc_078", "sc_079", "sc_085", "sc_090"}
    survival_ids = {"sc_057", "sc_063", "sc_072", "sc_075", "sc_080", "sc_082", "sc_086", "sc_087"}
    
    if sc_id in tech_ids:
        theme = "tech"
    elif sc_id in temporal_ids:
        theme = "temporal"
    elif sc_id in economic_ids:
        theme = "economic"
    elif sc_id in survival_ids:
        theme = "survival"
    else:
        theme = "philosophical"

    if theme == "tech":
        nodes = [
            # Layer 1 (Depth 1) - n_1
            {
                "node_id": f"n_{sc_id}_1",
                "text": description,
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
                "text": f"Your choice to {fmt_a} causes a critical heap overflow in the primary node. The system enters a safe-mode cycle. To keep the simulation running, you must decide how to handle the memory buffer.",
                "pressure_context": "System instability",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2a_a",
                        "text": "Override the system safety limits.",
                        "effects": {p1: 2, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1": True},
                        "next_node": f"n_{sc_id}_3a"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2a_b",
                        "text": "Initiate a database rollback.",
                        "effects": {"Diplomacy": 2, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_a2": True},
                        "next_node": f"n_{sc_id}_3b"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_2b",
                "text": f"Choosing to {fmt_b} triggers a cryptographic mismatch. The core encryption keys are now out of sync, threatening a full system lock. How do you respond?",
                "pressure_context": "Cryptographic lock",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2b_a",
                        "text": "Force compliance using an override key.",
                        "effects": {"Obedience": 3, "Justice": 1},
                        "flags_set": {f"flag_{sc_id}_b1": True},
                        "next_node": f"n_{sc_id}_3c"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2b_b",
                        "text": "Halt synchronization to check drift.",
                        "effects": {"Compassion": 3, "Diplomacy": 2},
                        "flags_set": {f"flag_{sc_id}_b2": True},
                        "next_node": f"n_{sc_id}_3d"
                    }
                ]
            },
            # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
            {
                "node_id": f"n_{sc_id}_3a",
                "text": f"You overrode the safety limits. The simulation stabilized, but the high voltage has burned out the primary cooling unit. Do you bypass the auxiliary cooling block or shut down non-essential sectors?",
                "pressure_context": "Hardware thermal threat",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3a_a",
                        "text": "Bypass auxiliary cooling block.",
                        "effects": {"Integrity": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1_1": True},
                        "next_node": f"n_{sc_id}_4a_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3a_b",
                        "text": "Shut down non-essential sectors.",
                        "effects": {"Pragmatism": 3, "Integrity": -3},
                        "flags_set": {f"flag_{sc_id}_a1_2": True},
                        "next_node": f"n_{sc_id}_4a_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3b",
                "text": f"You initiated a rollback. The database is clean, but a metadata mismatch has stranded several active user connections in the virtual buffer. Do you force-terminate their sessions or rebuild the connection tables?",
                "pressure_context": "Stranded connections",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3b_a",
                        "text": "Force-terminate active sessions.",
                        "effects": {"Pragmatism": 3, "Integrity": -2},
                        "flags_set": {f"flag_{sc_id}_a2_1": True},
                        "next_node": f"n_{sc_id}_4b_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3b_b",
                        "text": "Rebuild connection tables manually.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_a2_2": True},
                        "next_node": f"n_{sc_id}_4b_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3c",
                "text": f"You forced the override. The keys matched, but the crude force-mount corrupted the security logs. The firewall has flagged this as an intrusion and closed all ports. Do you bypass the firewall or isolate the network?",
                "pressure_context": "Intrusion warning",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3c_a",
                        "text": "Bypass the local firewall.",
                        "effects": {"Ambition": 3, "Rationality": 1},
                        "flags_set": {f"flag_{sc_id}_b1_1": True},
                        "next_node": f"n_{sc_id}_4c_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3c_b",
                        "text": "Isolate the network segment.",
                        "effects": {"Idealism": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_b1_2": True},
                        "next_node": f"n_{sc_id}_4c_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3d",
                "text": f"You halted the sync to diagnose the drift. While analyzing the code, you discover a hidden backdoor siphoning telemetry to an external server. Do you close the backdoor or monitor it?",
                "pressure_context": "Backdoor discovered",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3d_a",
                        "text": "Close the backdoor immediately.",
                        "effects": {"Diplomacy": 3, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_b2_1": True},
                        "next_node": f"n_{sc_id}_4d_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3d_b",
                        "text": "Monitor the data stream.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_b2_2": True},
                        "next_node": f"n_{sc_id}_4d_2"
                    }
                ]
            },
            # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
            {
                "node_id": f"n_{sc_id}_4a_1",
                "text": "Bypassing the cooling block worked, but the heat has melted the physical telemetry drives. Do you extract the backup tapes or format the core?",
                "pressure_context": "Melted drives",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a1_a", "text": "Extract the physical backup tapes.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                    {"choice_id": f"c_{sc_id}_4a1_b", "text": "Format the core to prevent fire.", "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4a_2",
                "text": "Shutting down sectors preserved the mainframe, but the affected users are protesting the sudden outage. Do you ignore their complaints or offer credit compensations?",
                "pressure_context": "User protests",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a2_a", "text": "Ignore user complaints.", "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                    {"choice_id": f"c_{sc_id}_4a2_b", "text": "Offer credit compensations.", "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_1",
                "text": "Terminating the sessions caused permanent user data loss. The corporate audit demands a statement. Do you blame a software glitch or confess your intervention?",
                "pressure_context": "Audit demand",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b1_a", "text": "Blame the software glitch.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                    {"choice_id": f"c_{sc_id}_4b1_b", "text": "Confess manual intervention.", "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_2",
                "text": "Rebuilding the connection tables took hours, but the users are safe. However, the system is now running at 200% latency. Do you throttle performance or buy server bandwidth?",
                "pressure_context": "System latency",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b2_a", "text": "Throttle system performance.", "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                    {"choice_id": f"c_{sc_id}_4b2_b", "text": "Purchase external bandwidth.", "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_1",
                "text": "Bypassing the firewall exposed the system. A malware payload is executing in the registry. Do you run a destructive wipe or deploy quarantine filters?",
                "pressure_context": "Malware payload",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c1_a", "text": "Execute destructive system wipe.", "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                    {"choice_id": f"c_{sc_id}_4c1_b", "text": "Deploy local quarantine filters.", "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_2",
                "text": "Isolating the network prevented external damage, but the system is now completely cut off from the global grid. Do you operate offline or restore connections?",
                "pressure_context": "Network isolation",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c2_a", "text": "Operate in offline mode.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                    {"choice_id": f"c_{sc_id}_4c2_b", "text": "Restore connections under monitoring.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_1",
                "text": "You closed the backdoor. The siphoning stopped, but the hacker triggers a remote self-destruct script in retaliation. Do you pull the physical power plug or run a counter-exploit?",
                "pressure_context": "Self-destruct threat",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d1_a", "text": "Pull the physical power plug.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                    {"choice_id": f"c_{sc_id}_4d1_b", "text": "Execute a counter-exploit.", "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_2",
                "text": "Monitoring the stream revealed the receiver is a government security office. They demand you hand over the source code. Do you comply or refuse?",
                "pressure_context": "Government demand",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d2_a", "text": "Hand over the source code.", "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                    {"choice_id": f"c_{sc_id}_4d2_b", "text": "Refuse and delete the logs.", "effects": {"Integrity": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"}
                ]
            }
        ]
        
        endings = [
            {"ending_id": f"end_{sc_id}_1", "summary": f"You stabilized the core through technical override, but lost physical telemetry backups.", "dominant_traits": [p1, "Conscientious"], "behavioral_analysis": "Valued core system runtime over physical data storage integrity."},
            {"ending_id": f"end_{sc_id}_2", "summary": f"You formatted the core to avoid hardware fire, losing active simulation progress.", "dominant_traits": [p1, "Tactical"], "behavioral_analysis": "Prioritized fire safety over system uptime under pressure."},
            {"ending_id": f"end_{sc_id}_3", "summary": f"You compensated users for the system rollback, preserving trust at minor cost.", "dominant_traits": ["Pragmatic", "Strategic"], "behavioral_analysis": "Maintained client relations through economic concessions."},
            {"ending_id": f"end_{sc_id}_4", "summary": f"You confessed to the database intervention, facing severe corporate review.", "dominant_traits": ["Principled", "Exposed"], "behavioral_analysis": "Exhibited extreme integrity by admitting manual errors to the auditors."},
            {"ending_id": f"end_{sc_id}_5", "summary": f"You siphoned bandwidth to maintain operations, keeping system latency low.", "dominant_traits": ["Ambitious", "Corporate"], "behavioral_analysis": "Acquired high-cost infrastructure to sustain user experience limits."},
            {"ending_id": f"end_{sc_id}_6", "summary": f"You wiped the database to eradicate malware, saving the hardware from code decay.", "dominant_traits": ["Subversive", "Ethical"], "behavioral_analysis": "Used scorched-earth sanitization to remove malicious registry files."},
            {"ending_id": f"end_{sc_id}_7", "summary": f"You operated offline, preventing external infection but losing network connectivity.", "dominant_traits": ["Diplomatic", "Pragmatic"], "behavioral_analysis": "Chose complete network isolation to secure localized databases."},
            {"ending_id": f"end_{sc_id}_8", "summary": f"You counter-exploited the hacker, securing the mainframe through digital warfare.", "dominant_traits": ["Independent", "Combative"], "behavioral_analysis": "Defeated threat actors using advanced cybersecurity procedures."}
        ]

    elif theme == "temporal":
        nodes = [
            # Layer 1 (Depth 1) - n_1
            {
                "node_id": f"n_{sc_id}_1",
                "text": description,
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
                "text": f"Deciding to {fmt_a} creates a minor temporal echo. The local chronology begins to shift, and you detect duplicate signatures in the system logs. How do you stabilize the timeline?",
                "pressure_context": "Chronology shift",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2a_a",
                        "text": "Initiate a chronological purge of the echo.",
                        "effects": {p1: 2, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1": True},
                        "next_node": f"n_{sc_id}_3a"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2a_b",
                        "text": "Allow the echo to run to observe its drift.",
                        "effects": {"Diplomacy": 2, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_a2": True},
                        "next_node": f"n_{sc_id}_3b"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_2b",
                "text": f"Your choice to {fmt_b} causes a temporal displacement in the coordinates. The portal is unstable, and the arrival time of your payload is drifting. How do you secure the target?",
                "pressure_context": "Displacement drift",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2b_a",
                        "text": "Force portal open using high power.",
                        "effects": {"Obedience": 3, "Justice": 1},
                        "flags_set": {f"flag_{sc_id}_b1": True},
                        "next_node": f"n_{sc_id}_3c"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2b_b",
                        "text": "Shut portal and calculate new timeline.",
                        "effects": {"Compassion": 3, "Diplomacy": 2},
                        "flags_set": {f"flag_{sc_id}_b2": True},
                        "next_node": f"n_{sc_id}_3d"
                    }
                ]
            },
            # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
            {
                "node_id": f"n_{sc_id}_3a",
                "text": f"You purged the echo, but the displacement has erased a key historical event from your database, causing a localized memory fracture. Do you reconstruct the memory or accept the blank timeline?",
                "pressure_context": "Memory fracture",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3a_a",
                        "text": "Synthesize the missing history.",
                        "effects": {"Integrity": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1_1": True},
                        "next_node": f"n_{sc_id}_4a_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3a_b",
                        "text": "Accept the blank timeline.",
                        "effects": {"Pragmatism": 3, "Integrity": -3},
                        "flags_set": {f"flag_{sc_id}_a1_2": True},
                        "next_node": f"n_{sc_id}_4a_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3b",
                "text": f"You let the echo run. The twin timeline is now interacting with the present, and observers see ghosts of alternate choices. Do you erect dampeners or bridge the two timelines?",
                "pressure_context": "Reality interference",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3b_a",
                        "text": "Erect temporal dampeners.",
                        "effects": {"Pragmatism": 3, "Integrity": -2},
                        "flags_set": {f"flag_{sc_id}_a2_1": True},
                        "next_node": f"n_{sc_id}_4b_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3b_b",
                        "text": "Bridge timelines together.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_a2_2": True},
                        "next_node": f"n_{sc_id}_4b_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3c",
                "text": f"Forcing the portal open caused a micro-singularity at the destination. It is slowly consuming local matter. Do you collapse the portal or feed energy to stabilize the throat?",
                "pressure_context": "Micro-singularity threat",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3c_a",
                        "text": "Collapse the portal immediately.",
                        "effects": {"Ambition": 3, "Rationality": 1},
                        "flags_set": {f"flag_{sc_id}_b1_1": True},
                        "next_node": f"n_{sc_id}_4c_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3c_b",
                        "text": "Feed energy to stabilize the throat.",
                        "effects": {"Idealism": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_b1_2": True},
                        "next_node": f"n_{sc_id}_4c_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3d",
                "text": f"You shut down the portal. The calculation reveals that avoiding the paradox requires you to stay in the target timeline forever. Do you accept the exile or risk returning anyway?",
                "pressure_context": "Paradox calculations",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3d_a",
                        "text": "Accept timeline exile.",
                        "effects": {"Diplomacy": 3, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_b2_1": True},
                        "next_node": f"n_{sc_id}_4d_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3d_b",
                        "text": "Risk returning to the present.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_b2_2": True},
                        "next_node": f"n_{sc_id}_4d_2"
                    }
                ]
            },
            # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
            {
                "node_id": f"n_{sc_id}_4a_1",
                "text": "Synthesizing the history worked, but the artificial memories are causing mental degradation. Do you administer stabilizers or wipe the subject's memory?",
                "pressure_context": "Mental degradation",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a1_a", "text": "Administer temporal stabilizers.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                    {"choice_id": f"c_{sc_id}_4a1_b", "text": "Wipe memory completely.", "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4a_2",
                "text": "Accepting the blank timeline leaves the subject in a vegetative state, but the universe is stable. Do you keep them on life support or let them pass?",
                "pressure_context": "Vegetative subject",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a2_a", "text": "Keep them on life support.", "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                    {"choice_id": f"c_{sc_id}_4a2_b", "text": "Let them pass peacefully.", "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_1",
                "text": "The dampeners isolated the echoes, but now the city is split into disconnected reality bubbles. Do you force a merger of the bubbles or keep them separated?",
                "pressure_context": "Reality bubbles",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b1_a", "text": "Force merger of bubbles.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                    {"choice_id": f"c_{sc_id}_4b1_b", "text": "Maintain bubble separation.", "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_2",
                "text": "Bridging the timelines unified the present, but now every action is mirrored by an alternate self. Do you accept your double or fight for dominance?",
                "pressure_context": "Double presence",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b2_a", "text": "Coexist with alternate self.", "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                    {"choice_id": f"c_{sc_id}_4b2_b", "text": "Eliminate alternate self.", "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_1",
                "text": "Collapsing the portal cut off the singularity, but trapped your retrieval team on the other side. Do you launch a rescue probe or write them off?",
                "pressure_context": "Stranded team",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c1_a", "text": "Launch a rescue probe.", "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                    {"choice_id": f"c_{sc_id}_4c1_b", "text": "Write off stranded team.", "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_2",
                "text": "Stabilizing the throat succeeded, but the anomaly has created a permanent gateway. Strange energy is bleeding through. Do you shield the area or build a research base?",
                "pressure_context": "Gateway bleeding",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c2_a", "text": "Shield area and quarantine.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                    {"choice_id": f"c_{sc_id}_4c2_b", "text": "Build a research base.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_1",
                "text": "You accepted exile. In this primitive timeline, you have advanced technology. Do you rule as a deity or live in hiding?",
                "pressure_context": "Deity status",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d1_a", "text": "Rule as technological deity.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                    {"choice_id": f"c_{sc_id}_4d1_b", "text": "Live in complete hiding.", "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_2",
                "text": "You returned, but your timeline presence is now out of phase. You are a ghost, unable to touch anything. Do you search for a phase-shifter or accept your ghost form?",
                "pressure_context": "Ghost state",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d2_a", "text": "Search for phase-shifter.", "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                    {"choice_id": f"c_{sc_id}_4d2_b", "text": "Accept phase-shifted state.", "effects": {"Integrity": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"}
                ]
            }
        ]
        
        endings = [
            {"ending_id": f"end_{sc_id}_1", "summary": f"You stabilized the timeline echo but caused mental memory fractures in key subjects.", "dominant_traits": [p1, "Conscientious"], "behavioral_analysis": "Prioritized timeline integrity at the cost of cognitive health."},
            {"ending_id": f"end_{sc_id}_2", "summary": f"You wiped the subject's memory clean, leaving a blank history record but keeping the present stable.", "dominant_traits": [p1, "Tactical"], "behavioral_analysis": "Selected drastic amnestic overrides to resolve temporal paradoxes."},
            {"ending_id": f"end_{sc_id}_3", "summary": f"You merged local reality bubbles together, creating minor geographical overlaps.", "dominant_traits": ["Pragmatic", "Strategic"], "behavioral_analysis": "Forced spatial integration of disjointed temporal frameworks."},
            {"ending_id": f"end_{sc_id}_4", "summary": f"You accepted the presence of your alternate double, sharing resource allocations.", "dominant_traits": ["Principled", "Exposed"], "behavioral_analysis": "Exhibited high coexistence capacity with parallel self-identities."},
            {"ending_id": f"end_{sc_id}_5", "summary": f"You launched a rescue probe to retrieve stranded members from the closed singularity.", "dominant_traits": ["Ambitious", "Corporate"], "behavioral_analysis": "Deployed capital-intensive probes into hostile gravity regions."},
            {"ending_id": f"end_{sc_id}_6", "summary": f"You quarantined the gateway site, leaving the team stranded in the past forever.", "dominant_traits": ["Subversive", "Ethical"], "behavioral_analysis": "Enforced strict isolation to prevent cross-timeline contamination."},
            {"ending_id": f"end_{sc_id}_7", "summary": f"You established a primitive empire as a deity, modifying local laws using futuristic knowledge.", "dominant_traits": ["Diplomatic", "Pragmatic"], "behavioral_analysis": "Adapted to historical exile by building an advanced empire."},
            {"ending_id": f"end_{sc_id}_8", "summary": f"You returned as a phase-shifted phantom, monitoring the present without influence.", "dominant_traits": ["Independent", "Combative"], "behavioral_analysis": "Accepted non-physical observer status to preserve the prime timeline."}
        ]

    elif theme == "economic":
        nodes = [
            # Layer 1 (Depth 1) - n_1
            {
                "node_id": f"n_{sc_id}_1",
                "text": description,
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
                "text": f"Your choice to {fmt_a} incurs an unexpected tariff. The project's liquidity drops to a critical low, and you are unable to cover the upcoming operational expenses. How do you balance the ledger?",
                "pressure_context": "Liquidity crisis",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2a_a",
                        "text": "Liquidate reserve assets.",
                        "effects": {p1: 2, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1": True},
                        "next_node": f"n_{sc_id}_3a"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2a_b",
                        "text": "Request an emergency credit extension.",
                        "effects": {"Diplomacy": 2, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_a2": True},
                        "next_node": f"n_{sc_id}_3b"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_2b",
                "text": f"Choosing to {fmt_b} disrupts the local supply lines. A key contractor demands an immediate renegotiation of their fee, halting all deliveries. How do you proceed?",
                "pressure_context": "Supply chain disruption",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2b_a",
                        "text": "Accept terms to resume deliveries.",
                        "effects": {"Obedience": 3, "Justice": 1},
                        "flags_set": {f"flag_{sc_id}_b1": True},
                        "next_node": f"n_{sc_id}_3c"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2b_b",
                        "text": "Terminate contract and sue for breach.",
                        "effects": {"Compassion": 3, "Diplomacy": 2},
                        "flags_set": {f"flag_{sc_id}_b2": True},
                        "next_node": f"n_{sc_id}_3d"
                    }
                ]
            },
            # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
            {
                "node_id": f"n_{sc_id}_3a",
                "text": f"You liquidated the assets. The books are balanced, but the loss of reserves has downgraded your corporate credit rating. Do you cut research budgets or reduce employee benefits?",
                "pressure_context": "Credit rating drop",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3a_a",
                        "text": "Cut research budgets.",
                        "effects": {"Integrity": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1_1": True},
                        "next_node": f"n_{sc_id}_4a_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3a_b",
                        "text": "Reduce employee benefits.",
                        "effects": {"Pragmatism": 3, "Integrity": -3},
                        "flags_set": {f"flag_{sc_id}_a1_2": True},
                        "next_node": f"n_{sc_id}_4a_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3b",
                "text": f"The credit extension was approved, but the high interest rates drain weekly cash flow. A predatory lender offers to buy your debt in exchange for a board seat. Do you accept their offer or face liquidation?",
                "pressure_context": "Predatory debt offer",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3b_a",
                        "text": "Accept lender's board seat.",
                        "effects": {"Pragmatism": 3, "Integrity": -2},
                        "flags_set": {f"flag_{sc_id}_a2_1": True},
                        "next_node": f"n_{sc_id}_4b_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3b_b",
                        "text": "Refuse and face liquidation.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_a2_2": True},
                        "next_node": f"n_{sc_id}_4b_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3c",
                "text": f"You accepted their terms. Deliveries have resumed, but your margins are now razor-thin. To survive, you must find a way to offset the cost. Do you raise product prices or source cheaper materials?",
                "pressure_context": "Thin margins",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3c_a",
                        "text": "Raise product prices.",
                        "effects": {"Ambition": 3, "Rationality": 1},
                        "flags_set": {f"flag_{sc_id}_b1_1": True},
                        "next_node": f"n_{sc_id}_4c_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3c_b",
                        "text": "Source cheaper raw materials.",
                        "effects": {"Idealism": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_b1_2": True},
                        "next_node": f"n_{sc_id}_4c_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3d",
                "text": f"You terminated the contract. The legal dispute has tied up your operating capital in court escrow. Without funds, the facility is running on fumes. Do you lay off half the workforce or sell proprietary patents?",
                "pressure_context": "Operating capital frozen",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3d_a",
                        "text": "Lay off half the workforce.",
                        "effects": {"Diplomacy": 3, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_b2_1": True},
                        "next_node": f"n_{sc_id}_4d_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3d_b",
                        "text": "Sell proprietary patents.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_b2_2": True},
                        "next_node": f"n_{sc_id}_4d_2"
                    }
                ]
            },
            # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
            {
                "node_id": f"n_{sc_id}_4a_1",
                "text": "Cutting research halted all future development. The company is stable but stagnant. Do you merge with a competitor or continue independently?",
                "pressure_context": "Stagnant business",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a1_a", "text": "Merge with competitor.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                    {"choice_id": f"c_{sc_id}_4a1_b", "text": "Remain independent.", "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4a_2",
                "text": "Reducing benefits led to a massive union protest outside your gates. Do you negotiate with the union reps or lock them out?",
                "pressure_context": "Union protest",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a2_a", "text": "Negotiate with union.", "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                    {"choice_id": f"c_{sc_id}_4a2_b", "text": "Lock workers out.", "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_1",
                "text": "The lender takes the board seat and immediately votes to replace you as CEO. Do you launch a proxy fight or accept the buyout?",
                "pressure_context": "CEO replacement vote",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b1_a", "text": "Launch proxy battle.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                    {"choice_id": f"c_{sc_id}_4b1_b", "text": "Accept cash buyout.", "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_2",
                "text": "Liquidation starts. The court auctioneer is selling off the assets. Do you buy back the core code using personal funds or let it go?",
                "pressure_context": "Asset liquidation",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b2_a", "text": "Buy core code back.", "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                    {"choice_id": f"c_{sc_id}_4b2_b", "text": "Let assets be sold.", "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_1",
                "text": "Raising prices drove away your customer base. The sales volume collapses. Do you pivot to a luxury brand or return to original pricing?",
                "pressure_context": "Sales volume collapse",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c1_a", "text": "Pivot to luxury brand.", "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                    {"choice_id": f"c_{sc_id}_4c1_b", "text": "Return to original pricing.", "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_2",
                "text": "The cheaper materials are fragile. Several products fail in the field, causing minor accidents. Do you issue a recall or deny liability?",
                "pressure_context": "Fragile materials",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c2_a", "text": "Issue product recall.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                    {"choice_id": f"c_{sc_id}_4c2_b", "text": "Deny liability completely.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_1",
                "text": "Laying off the workforce halted operations. The remaining staff are overworked. Do you automate the tasks with AI or close the site?",
                "pressure_context": "Overworked staff",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d1_a", "text": "Automate tasks with AI.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                    {"choice_id": f"c_{sc_id}_4d1_b", "text": "Close site permanently.", "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_2",
                "text": "Selling the patents saved the company, but your competitor is now using your tech. Do you sue for infringement or design a replacement?",
                "pressure_context": "Competitor using tech",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d2_a", "text": "Sue for infringement.", "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                    {"choice_id": f"c_{sc_id}_4d2_b", "text": "Design replacement tech.", "effects": {"Integrity": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"}
                ]
            }
        ]
        
        endings = [
            {"ending_id": f"end_{sc_id}_1", "summary": f"You merged with a competitor, sacrificing autonomous control to stay financially solvent.", "dominant_traits": [p1, "Conscientious"], "behavioral_analysis": "Valued corporate survival over corporate autonomy."},
            {"ending_id": f"end_{sc_id}_2", "summary": f"You maintained independent status but are running at a continuous budget deficit.", "dominant_traits": [p1, "Tactical"], "behavioral_analysis": "Chose independent operations despite extreme capital constraints."},
            {"ending_id": f"end_{sc_id}_3", "summary": f"You locked out union representatives, suffering permanent labor relations damage.", "dominant_traits": ["Pragmatic", "Strategic"], "behavioral_analysis": "Prioritized operations schedule over collective labor agreements."},
            {"ending_id": f"end_{sc_id}_4", "summary": f"You accepted a cash buyout from a predatory lender, retiring from the firm completely.", "dominant_traits": ["Principled", "Exposed"], "behavioral_analysis": "Liquidated your ownership stake to exit high-interest debt cycles."},
            {"ending_id": f"end_{sc_id}_5", "summary": f"You pivoted to a luxury market structure, recovering margins from wealthier clients.", "dominant_traits": ["Ambitious", "Corporate"], "behavioral_analysis": "Modified pricing models to serve high-end luxury client niches."},
            {"ending_id": f"end_{sc_id}_6", "summary": f"You issued a voluntary product recall, absorbing massive short-term losses to secure consumer safety.", "dominant_traits": ["Subversive", "Ethical"], "behavioral_analysis": "Placed consumer welfare above quarterly balance sheets."},
            {"ending_id": f"end_{sc_id}_7", "summary": f"You automated the facility using algorithms, operating at minimal labor expense.", "dominant_traits": ["Diplomatic", "Pragmatic"], "behavioral_analysis": "Removed human overhead to optimize system profit parameters."},
            {"ending_id": f"end_{sc_id}_8", "summary": f"You shut down operations permanently, declaring bankruptcy to erase local liabilities.", "dominant_traits": ["Independent", "Combative"], "behavioral_analysis": "Terminated corporate liability through complete asset dissolution."}
        ]

    elif theme == "survival":
        nodes = [
            # Layer 1 (Depth 1) - n_1
            {
                "node_id": f"n_{sc_id}_1",
                "text": description,
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
                "text": f"Deciding to {fmt_a} triggers a structural warning. The main dome's pressure hull is buckling under external forces. You must act to secure the perimeter.",
                "pressure_context": "Structural failure",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2a_a",
                        "text": "Reinforce hull plates manually.",
                        "effects": {p1: 2, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1": True},
                        "next_node": f"n_{sc_id}_3a"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2a_b",
                        "text": "Evacuate damaged sector immediately.",
                        "effects": {"Diplomacy": 2, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_a2": True},
                        "next_node": f"n_{sc_id}_3b"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_2b",
                "text": f"Choosing to {fmt_b} exposes the sector to an external environmental hazard. Toxins are seeping into the air filtration unit. How do you secure the air supply?",
                "pressure_context": "Toxin seepage",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2b_a",
                        "text": "Initiate emergency purge of ventilation.",
                        "effects": {"Obedience": 3, "Justice": 1},
                        "flags_set": {f"flag_{sc_id}_b1": True},
                        "next_node": f"n_{sc_id}_3c"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2b_b",
                        "text": "Seal intakes and use reserve oxygen.",
                        "effects": {"Compassion": 3, "Diplomacy": 2},
                        "flags_set": {f"flag_{sc_id}_b2": True},
                        "next_node": f"n_{sc_id}_3d"
                    }
                ]
            },
            # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
            {
                "node_id": f"n_{sc_id}_3a",
                "text": f"You reinforced the hull, but the extra weight has overloaded the local power grid, cutting off lighting. Do you route battery power to the grid or stay in the dark?",
                "pressure_context": "Power grid overload",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3a_a",
                        "text": "Route battery power to the grid.",
                        "effects": {"Integrity": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1_1": True},
                        "next_node": f"n_{sc_id}_4a_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3a_b",
                        "text": "Conserve battery for life support.",
                        "effects": {"Pragmatism": 3, "Integrity": -3},
                        "flags_set": {f"flag_{sc_id}_a1_2": True},
                        "next_node": f"n_{sc_id}_4a_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3b",
                "text": f"You evacuated the sector. The refugees are packed into the core module, but food rations are dangerously low. Do you enforce strict rationing or send a party to scavenge?",
                "pressure_context": "Refugee supply shortage",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3b_a",
                        "text": "Enforce strict food rationing.",
                        "effects": {"Pragmatism": 3, "Integrity": -2},
                        "flags_set": {f"flag_{sc_id}_a2_1": True},
                        "next_node": f"n_{sc_id}_4b_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3b_b",
                        "text": "Send a scavenging party.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_a2_2": True},
                        "next_node": f"n_{sc_id}_4b_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3c",
                "text": f"The purge cleared the toxins, but the venting blew out the secondary seals. A severe storm is approaching the valley. Do you weld the seals in the storm or retreat to the bunker?",
                "pressure_context": "Blown ventilation seals",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3c_a",
                        "text": "Weld seals in the storm.",
                        "effects": {"Ambition": 3, "Rationality": 1},
                        "flags_set": {f"flag_{sc_id}_b1_1": True},
                        "next_node": f"n_{sc_id}_4c_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3c_b",
                        "text": "Retreat to safety bunker.",
                        "effects": {"Idealism": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_b1_2": True},
                        "next_node": f"n_{sc_id}_4c_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3d",
                "text": f"You sealed the air intakes. The reserve oxygen is steady, but carbon dioxide levels are rising rapidly. Do you bypass CO2 scrubbers or open manual vents slightly?",
                "pressure_context": "Carbon dioxide spike",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3d_a",
                        "text": "Bypass CO2 scrubbers.",
                        "effects": {"Diplomacy": 3, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_b2_1": True},
                        "next_node": f"n_{sc_id}_4d_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3d_b",
                        "text": "Open manual vents slightly.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_b2_2": True},
                        "next_node": f"n_{sc_id}_4d_2"
                    }
                ]
            },
            # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
            {
                "node_id": f"n_{sc_id}_4a_1",
                "text": "Routing battery power restored lights, but a short circuit starts an electrical fire in the power bay. Do you flood the bay with inert gas or fight it with foam?",
                "pressure_context": "Power bay fire",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a1_a", "text": "Flood bay with inert gas.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                    {"choice_id": f"c_{sc_id}_4a1_b", "text": "Fight fire with foam.", "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4a_2",
                "text": "Conserving the battery kept life support running, but the darkness caused panic. A riot breaks out near the escape pods. Do you deploy crowd control or lock the pod bay?",
                "pressure_context": "Pod bay riot",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a2_a", "text": "Deploy crowd control.", "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                    {"choice_id": f"c_{sc_id}_4a2_b", "text": "Lock pod bay doors.", "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_1",
                "text": "Rationing kept everyone alive, but the malnutrition has triggered a viral outbreak. Do you quarantine the sick or share meds equally?",
                "pressure_context": "Viral outbreak",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b1_a", "text": "Quarantine the sick.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                    {"choice_id": f"c_{sc_id}_4b1_b", "text": "Distribute meds equally.", "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_2",
                "text": "The scavengers returned with supplies, but brought back a leaking radioactive container. Do you eject it or construct a lead shield?",
                "pressure_context": "Radioactive leakage",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b2_a", "text": "Eject container into wild.", "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                    {"choice_id": f"c_{sc_id}_4b2_b", "text": "Construct lead shield.", "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_1",
                "text": "Welding in the storm succeeded, but you were struck by debris, fracturing your arm. Do you amputate the limb or treat it with antiseptic?",
                "pressure_context": "Severely fractured arm",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c1_a", "text": "Amputate damaged limb.", "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                    {"choice_id": f"c_{sc_id}_4c1_b", "text": "Treat wound with antiseptic.", "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_2",
                "text": "Retreating to the bunker saved you, but the storm destroyed the outer antennas. You are cut off from rescue signals. Do you wait in the bunker or climb the mast to fix it?",
                "pressure_context": "Antenna collapse",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c2_a", "text": "Wait in bunker for rescue.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                    {"choice_id": f"c_{sc_id}_4c2_b", "text": "Climb mast to fix antenna.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_1",
                "text": "Bypassing the scrubbers released toxic fumes, causing several crew members to hallucinate. One is holding the air valve open. Do you subdue them or reason with them?",
                "pressure_context": "Hallucinating crew member",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d1_a", "text": "Subdue crew member.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                    {"choice_id": f"c_{sc_id}_4d1_b", "text": "Reason with them.", "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_2",
                "text": "Opening the vents slightly let in clean air, but also let in a wild toxic creature nesting in the pipes. Do you flush the pipes with steam or hunt the creature?",
                "pressure_context": "Creature in ventilation",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d2_a", "text": "Flush pipes with steam.", "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                    {"choice_id": f"c_{sc_id}_4d2_b", "text": "Hunt creature with rifle.", "effects": {"Integrity": 3}, "ending_id": f"end_{sc_id}_1"}
                ]
            }
        ]
        
        endings = [
            {"ending_id": f"end_{sc_id}_1", "summary": f"You flooded the power bay with inert gas, preserving structural integrity but losing backup battery systems.", "dominant_traits": [p1, "Conscientious"], "behavioral_analysis": "Chose immediate fire suppression over system power reserves."},
            {"ending_id": f"end_{sc_id}_2", "summary": f"You fought the fire with foam but suffered minor toxic inhalation while securing the dome.", "dominant_traits": [p1, "Tactical"], "behavioral_analysis": "Exhibited high physical risk tolerance to resolve safety incidents."},
            {"ending_id": f"end_{sc_id}_3", "summary": f"You locked the pod bay doors, preventing the riot from damaging escape vectors.", "dominant_traits": ["Pragmatic", "Strategic"], "behavioral_analysis": "Enforced quarantine gates under direct crowd pressure."},
            {"ending_id": f"end_{sc_id}_4", "summary": f"You distributed medical supplies equally, resolving the outbreak but leaving reserves depleted.", "dominant_traits": ["Principled", "Exposed"], "behavioral_analysis": "Prioritized egalitarian resource allocation over stock security."},
            {"ending_id": f"end_{sc_id}_5", "summary": f"You amputated your damaged limb in the field, surviving the infection but losing physical capabilities.", "dominant_traits": ["Ambitious", "Corporate"], "behavioral_analysis": "Exhibited drastic self-preservation capability under isolation."},
            {"ending_id": f"end_{sc_id}_6", "summary": f"You retreated to the bunker, surviving the storm safely but losing connection to the rescue grid.", "dominant_traits": ["Subversive", "Ethical"], "behavioral_analysis": "Accepted signal isolation to preserve physical safety parameters."},
            {"ending_id": f"end_{sc_id}_7", "summary": f"You climbed the antenna mast to repair signals, securing direct rescue dispatch.", "dominant_traits": ["Diplomatic", "Pragmatic"], "behavioral_analysis": "Confronted height hazards to restore communication arrays."},
            {"ending_id": f"end_{sc_id}_8", "summary": f"You flushed the ventilation pipes with hot steam, killing the creature and clearing the air channels.", "dominant_traits": ["Independent", "Combative"], "behavioral_analysis": "Resolved hazard threats using high-pressure thermal flushes."}
        ]

    else: # theme == "philosophical"
        nodes = [
            # Layer 1 (Depth 1) - n_1
            {
                "node_id": f"n_{sc_id}_1",
                "text": description,
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
                "text": f"Your decision to {fmt_a} challenges the local ethical council. They argue your choice violates the primary directive of collective fairness. How do you justify your action?",
                "pressure_context": "Ethical challenge",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2a_a",
                        "text": "Argue from utilitarian benefit.",
                        "effects": {p1: 2, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1": True},
                        "next_node": f"n_{sc_id}_3a"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2a_b",
                        "text": "Defend decision as moral right.",
                        "effects": {"Diplomacy": 2, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_a2": True},
                        "next_node": f"n_{sc_id}_3b"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_2b",
                "text": f"Choosing to {fmt_b} creates an epistemic conflict. By prioritizing this option, you are forced to ignore empirical data that contradicts your premise. How do you resolve the doubt?",
                "pressure_context": "Epistemic conflict",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_2b_a",
                        "text": "Double down on initial logic.",
                        "effects": {"Obedience": 3, "Justice": 1},
                        "flags_set": {f"flag_{sc_id}_b1": True},
                        "next_node": f"n_{sc_id}_3c"
                    },
                    {
                        "choice_id": f"c_{sc_id}_2b_b",
                        "text": "Re-open inquiry for new data.",
                        "effects": {"Compassion": 3, "Diplomacy": 2},
                        "flags_set": {f"flag_{sc_id}_b2": True},
                        "next_node": f"n_{sc_id}_3d"
                    }
                ]
            },
            # Layer 3 (Depth 3) - n_3a, n_3b, n_3c, n_3d
            {
                "node_id": f"n_{sc_id}_3a",
                "text": f"You argued for the greater good. The council accepts it, but demands you sacrifice the property of a minority group to achieve this outcome. Do you comply or refuse?",
                "pressure_context": "Utilitarian demands",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3a_a",
                        "text": "Comply with sacrifice demand.",
                        "effects": {"Integrity": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_a1_1": True},
                        "next_node": f"n_{sc_id}_4a_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3a_b",
                        "text": "Refuse sacrifice demand.",
                        "effects": {"Pragmatism": 3, "Integrity": -3},
                        "flags_set": {f"flag_{sc_id}_a1_2": True},
                        "next_node": f"n_{sc_id}_4a_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3b",
                "text": f"You defended the moral right. However, this has angered the general population, who are suffering from the practical fallout of your choice. Do you enforce your ruling or resign?",
                "pressure_context": "Public anger",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3b_a",
                        "text": "Enforce moral ruling strictly.",
                        "effects": {"Pragmatism": 3, "Integrity": -2},
                        "flags_set": {f"flag_{sc_id}_a2_1": True},
                        "next_node": f"n_{sc_id}_4b_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3b_b",
                        "text": "Resign position in protest.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_a2_2": True},
                        "next_node": f"n_{sc_id}_4b_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3c",
                "text": f"You doubled down on your initial logic. But the logical paradox has caused a schism among your students, split between rival schools. Do you choose a side or remain neutral?",
                "pressure_context": "Academic schism",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3c_a",
                        "text": "Align with rationalist faction.",
                        "effects": {"Ambition": 3, "Rationality": 1},
                        "flags_set": {f"flag_{sc_id}_b1_1": True},
                        "next_node": f"n_{sc_id}_4c_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3c_b",
                        "text": "Remain neutral mediator.",
                        "effects": {"Idealism": 3, "Courage": 2},
                        "flags_set": {f"flag_{sc_id}_b1_2": True},
                        "next_node": f"n_{sc_id}_4c_2"
                    }
                ]
            },
            {
                "node_id": f"n_{sc_id}_3d",
                "text": f"You re-opened the inquiry. The new data shows your initial premise was wrong, but admitting this will destroy your academic career. Do you publish the correction or suppress the data?",
                "pressure_context": "Career-destroying data",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2"],
                "choices": [
                    {
                        "choice_id": f"c_{sc_id}_3d_a",
                        "text": "Publish correction and fallout.",
                        "effects": {"Diplomacy": 3, "Pragmatism": 2},
                        "flags_set": {f"flag_{sc_id}_b2_1": True},
                        "next_node": f"n_{sc_id}_4d_1"
                    },
                    {
                        "choice_id": f"c_{sc_id}_3d_b",
                        "text": "Suppress data to protect career.",
                        "effects": {"Courage": 3, "Independence": 2},
                        "flags_set": {f"flag_{sc_id}_b2_2": True},
                        "next_node": f"n_{sc_id}_4d_2"
                    }
                ]
            },
            # Layer 4 (Depth 4) - n_4a_1, n_4a_2, n_4b_1, n_4b_2, n_4c_1, n_4c_2, n_4d_1, n_4d_2
            {
                "node_id": f"n_{sc_id}_4a_1",
                "text": "You authorized the sacrifice. The minority group has launched a high court appeal. Do you hire a lawyer or defend yourself?",
                "pressure_context": "High court appeal",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a1_a", "text": "Hire professional lawyer.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_1"},
                    {"choice_id": f"c_{sc_id}_4a1_b", "text": "Defend yourself in court.", "effects": {"Integrity": 3, "Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4a_2",
                "text": "Refusing the sacrifice has stalled the project. The board wants to replace you. Do you fight their vote or accept a consultant role?",
                "pressure_context": "Replacement vote",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4a2_a", "text": "Fight board's vote.", "effects": {"Courage": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_2"},
                    {"choice_id": f"c_{sc_id}_4a2_b", "text": "Accept consultant role.", "effects": {"Courage": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_1",
                "text": "Enforcing the ruling strictly sparked protests. The police ask to clear the square. Do you authorize force or withdraw the ruling?",
                "pressure_context": "Square protest",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b1_a", "text": "Authorize force to clear.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_3"},
                    {"choice_id": f"c_{sc_id}_4b1_b", "text": "Withdraw ruling immediately.", "effects": {"Courage": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4b_2",
                "text": "You resigned. An activist group asks you to lead their campaign to overthrow the council. Do you join them or retire?",
                "pressure_context": "Activist campaign",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_a2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4b2_a", "text": "Join overthrow campaign.", "effects": {"Obedience": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_4"},
                    {"choice_id": f"c_{sc_id}_4b2_b", "text": "Live life in retirement.", "effects": {"Independence": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_1",
                "text": "Aligning with the rationalists has isolated you from empiricists who accuse you of dogmatism. Do you publish a defense or ignore them?",
                "pressure_context": "Dogmatism accusation",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c1_a", "text": "Publish logical defense.", "effects": {"Ambition": 3}, "flags_set": {}, "ending_id": f"end_{sc_id}_5"},
                    {"choice_id": f"c_{sc_id}_4c1_b", "text": "Ignore their accusations.", "effects": {"Integrity": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4c_2",
                "text": "Remaining neutral has led both factions to view you as a coward plotting your banishment. Do you seek an alliance or accept banishment?",
                "pressure_context": "Banishment plot",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b1_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4c2_a", "text": "Seek private alliance.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_6"},
                    {"choice_id": f"c_{sc_id}_4c2_b", "text": "Accept banishment quietly.", "effects": {"Diplomacy": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_1",
                "text": "Publishing the correction destroyed your credibility, but you feel free. A minor university offers a teaching post. Do you accept it or retire?",
                "pressure_context": "Teaching post offer",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_1"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d1_a", "text": "Accept teaching post.", "effects": {"Pragmatism": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_7"},
                    {"choice_id": f"c_{sc_id}_4d1_b", "text": "Retire from academic life.", "effects": {"Independence": 2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"}
                ]
            },
            {
                "node_id": f"n_{sc_id}_4d_2",
                "text": "Suppressing the data worked, but a colleague has found your notes and threatens blackmail. Do you promote them or report them?",
                "pressure_context": "Blackmail threat",
                "visibility": "conditional",
                "required_flags": [f"flag_{sc_id}_b2_2"],
                "choices": [
                    {"choice_id": f"c_{sc_id}_4d2_a", "text": "Promote them for silence.", "effects": {"Pragmatism": 2, "Integrity": -2}, "flags_set": {}, "ending_id": f"end_{sc_id}_8"},
                    {"choice_id": f"c_{sc_id}_4d2_b", "text": "Report blackmail immediately.", "effects": {"Integrity": 3}, "ending_id": f"end_{sc_id}_1"}
                ]
            }
        ]
        
        endings = [
            {"ending_id": f"end_{sc_id}_1", "summary": f"You authorized local sacrifices under utilitarian logic, defending the decision in court.", "dominant_traits": [p1, "Conscientious"], "behavioral_analysis": "Upheld collective logic even under legal scrutiny."},
            {"ending_id": f"end_{sc_id}_2", "summary": f"You stood trial alone to defend the ethics of your actions, refusing corporate defense counsel.", "dominant_traits": [p1, "Tactical"], "behavioral_analysis": "Refused legal compromises to maintain absolute moral clarity."},
            {"ending_id": f"end_{sc_id}_3", "summary": f"You stepped down to a consultant position, advising the ethical board from the sidelines.", "dominant_traits": ["Pragmatic", "Strategic"], "behavioral_analysis": "Retreated from direct rule to retain administrative influence."},
            {"ending_id": f"end_{sc_id}_4", "summary": f"You joined the campaign to challenge the council's dogmas, becoming a prominent reform speaker.", "dominant_traits": ["Principled", "Exposed"], "behavioral_analysis": "Challenged the governing body when its logic became dogmatic."},
            {"ending_id": f"end_{sc_id}_5", "summary": f"You retired to a quiet life, leaving the ethical schisms of the university behind.", "dominant_traits": ["Ambitious", "Corporate"], "behavioral_analysis": "Withdrew from intellectual dispute to seek personal peace."},
            {"ending_id": f"end_{sc_id}_6", "summary": f"You published a rigorous logical defense of your school, cementing your academic legacy.", "dominant_traits": ["Subversive", "Ethical"], "behavioral_analysis": "Supported rationalist factions through formal academic publications."},
            {"ending_id": f"end_{sc_id}_7", "summary": f"You accepted exile from the university, moving to a small remote village to teach simple arithmetic.", "dominant_traits": ["Diplomatic", "Pragmatic"], "behavioral_analysis": "Quietly accepted geographic banishment to preserve your sanity."},
            {"ending_id": f"end_{sc_id}_8", "summary": f"You promoted the blackmailer, carrying the secret of the data compromise to your grave.", "dominant_traits": ["Independent", "Combative"], "behavioral_analysis": "Chose career self-preservation over empirical scientific honesty."}
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
